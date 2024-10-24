// utils/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const jwtMiddleware = async (req: NextRequest) => {

    const authHeader = req.headers.get('authorization'); // Use get method to access headers
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return NextResponse.json(
            { message: "Token required" },
            { status: 200 }
          );
      }

    try {
        const decoded = jwt.verify(token, secret);
        return "Authorized"
      } catch (error) {
        return "Unauthorized"
      }
};
