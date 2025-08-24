import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { mobile, password } = await request.json();

    // Validate input
    if (!mobile || !password) {
      return NextResponse.json(
        { error: 'Mobile and password are required' },
        { status: 400 }
      );
    }

    // Find user by mobile
    const user = await prisma.user.findUnique({
      where: { mobile: mobile.toString() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      mobile: user.mobile,
      name: user.name
    });

    // Return user data (without password) and token
    const userData = {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      balance: user.balance,
      createdAt: user.createdAt
    };

    return NextResponse.json({
      message: 'Login successful',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
