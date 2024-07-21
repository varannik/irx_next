// utils/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export const jwtMiddleware = async (req: NextRequest) => {
    const token = await getToken({ req, secret });
    if (token) {
        return "Authorized"
    } else {
        return "Unauthorized"
    }
};