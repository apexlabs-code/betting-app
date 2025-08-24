import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { name, mobile, password } = await request.json();

    // Validate input
    if (!name || !mobile || !password) {
      return NextResponse.json(
        { error: 'Name, mobile, and password are required' },
        { status: 400 }
      );
    }

    // Validate mobile number format (basic validation)
    if (!/^\d{10}$/.test(mobile.toString())) {
      return NextResponse.json(
        { error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { mobile: mobile.toString() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this mobile number already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        mobile: mobile.toString(),
        password: hashedPassword,
        balance: 0.0
      }
    });

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
      message: 'Registration successful',
      user: userData,
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
