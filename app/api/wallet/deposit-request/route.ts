import { NextRequest, NextResponse } from 'next/server';
import { withAuth, getAuthUser } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

async function handler(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    const { amount, upiId, reference } = await request.json();

    // Validation
    if (!amount || amount < 200 || amount > 50000) {
      return NextResponse.json(
        { error: 'Amount must be between ₹200 and ₹50,000' },
        { status: 400 }
      );
    }

    // Create deposit request transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.userId,
        type: 'deposit_request',
        amount: parseFloat(amount),
        status: 'pending',
        upiId: upiId || null,
        reference: reference || null,
        remarks: 'Deposit request created'
      }
    });

    return NextResponse.json({
      message: 'Deposit request created successfully',
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    });

  } catch (error) {
    console.error('Deposit request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
