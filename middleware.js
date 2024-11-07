
import { NextResponse } from "next/server"
import { getToken } from 'next-auth/jwt';


export default async function middleware(req){
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session) {
        // Redirect to login if not authenticated
        const loginUrl = new URL('/api/auth/signin', req.url);
        return NextResponse.redirect(loginUrl);
      }
    
      return NextResponse.next(); // Allow access if session exists


}
export const config = {
    matcher: ['/api/auth/user'], // Apply middleware to specific routes
  };
