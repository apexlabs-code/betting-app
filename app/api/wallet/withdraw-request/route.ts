import { NextRequest, NextResponse } from 'next/server';
import { withAuth, getAuthUser } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

async function handler(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    const { amount } = await request.json();

    // Validation
    if (!amount || amount < 200) {
      return NextResponse.json(
        { error: 'Minimum withdrawal amount is ₹200' },
        { status: 400 }
      );
    }

    // Get user data to check balance and bank details
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        balance: true,
        accountHolderName: true,
        bankName: true,
        accountNumber: true,
        ifscCode: true
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if bank details are available
    if (!userData.accountHolderName || !userData.bankName || !userData.accountNumber || !userData.ifscCode) {
      return NextResponse.json(
        { error: 'Please add your bank details first' },
        { status: 400 }
      );
    }

    // Check if user has sufficient balance
    if (userData.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Create withdrawal request transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.userId,
        type: 'withdraw_request',
        amount: parseFloat(amount),
        status: 'pending',
        remarks: 'Withdrawal request created'
      }
    });

    return NextResponse.json({
      message: 'Withdrawal request created successfully',
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    });

  } catch (error) {
    console.error('Withdrawal request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(handler);
