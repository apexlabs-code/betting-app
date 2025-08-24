import { NextRequest, NextResponse } from 'next/server';
import { withAuth, getAuthUser } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

async function handler(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    
    // Get fresh user data from database
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        name: true,
        mobile: true,
        balance: true,
        isActive: true,
        createdAt: true,
        accountHolderName: true,
        bankName: true,
        accountNumber: true,
        ifscCode: true,
        paytmNo: true,
        phonePeNo: true,
        googlePayNo: true
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!userData.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      user: userData
    });

  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
