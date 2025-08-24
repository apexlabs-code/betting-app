import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json();

    // Validate input
    if (!mobile) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { mobile: mobile.toString() },
      select: { id: true, mobile: true, name: true, isActive: true }
    });

    return NextResponse.json({
      exists: !!user,
      isActive: user?.isActive || false,
      mobile: user?.mobile || null
    });

  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
