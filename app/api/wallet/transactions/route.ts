import { NextRequest, NextResponse } from 'next/server';
import { withAuth, getAuthUser } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

async function handler(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 'deposit' or 'withdraw'
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build filter conditions
    const whereCondition: any = {
      userId: user.userId
    };

    if (type === 'deposit') {
      whereCondition.type = { in: ['deposit', 'deposit_request'] };
    } else if (type === 'withdraw') {
      whereCondition.type = { in: ['withdraw', 'withdraw_request'] };
    }

    // Get transactions with pagination
    const [transactions, totalCount] = await Promise.all([
      prisma.transaction.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          type: true,
          amount: true,
          status: true,
          reference: true,
          upiId: true,
          remarks: true,
          createdAt: true
        }
      }),
      prisma.transaction.count({ where: whereCondition })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      transactions,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Transaction history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
