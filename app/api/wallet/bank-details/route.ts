import { NextRequest, NextResponse } from 'next/server';
import { withAuth, getAuthUser } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

async function handler(request: NextRequest) {
  try {
    const user = getAuthUser(request);
    const { 
      accountHolderName, 
      bankName, 
      accountNumber, 
      ifscCode, 
      paytmNo, 
      phonePeNo, 
      googlePayNo 
    } = await request.json();

    // Validation
    if (!accountHolderName || !bankName || !accountNumber || !ifscCode) {
      return NextResponse.json(
        { error: 'Account holder name, bank name, account number, and IFSC code are required' },
        { status: 400 }
      );
    }

    // Update user bank details
    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: {
        accountHolderName: accountHolderName.trim(),
        bankName: bankName.trim(),
        accountNumber: accountNumber.trim(),
        ifscCode: ifscCode.trim().toUpperCase(),
        paytmNo: paytmNo?.trim() || null,
        phonePeNo: phonePeNo?.trim() || null,
        googlePayNo: googlePayNo?.trim() || null
      },
      select: {
        id: true,
        name: true,
        mobile: true,
        balance: true,
        accountHolderName: true,
        bankName: true,
        accountNumber: true,
        ifscCode: true,
        paytmNo: true,
        phonePeNo: true,
        googlePayNo: true
      }
    });

    return NextResponse.json({
      message: 'Bank details updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Bank details update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(handler);
