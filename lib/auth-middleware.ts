import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/jwt';

export function withAuth(handler: (request: NextRequest, context: any) => Promise<NextResponse>) {
  return async (request: NextRequest, context: any) => {
    try {
      const token = getTokenFromRequest(request);
      
      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Add user info to request context
      (request as any).user = payload;
      
      return handler(request, context);
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

export function getAuthUser(request: NextRequest) {
  return (request as any).user;
}
