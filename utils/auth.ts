import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/gMangodb';

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {
      strategy: "database", // Use the database strategy for sessions
      maxAge: 30 * 24 * 60 * 60, // Session expiration in seconds (e.g., 30 days)
    },
    callbacks: {
      async jwt({ token, account }) {
        // If the user is logging in, persist the accessToken in the token object
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      
      async session({ session ,user }) {
        session.user.id = user.id as string;
        return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET
}