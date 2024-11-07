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
    
    callbacks: {
      // async signIn({ profile}) {
  
      //   try {
      //     await connectDB()
      //     const userExist = await User.findOne({email:profile?.email})
      //     if (!userExist) {
      //       await User.create({
      //         email: profile?.email,
      //         name: profile?.name,
      //         image: profile?.picture
      //       })
      //     }
  
      //     return true
  
      //   } catch(error){
      //     console.log(error)
      //     return false
      //   }
      // },
      // async session({ session }) {
      //   const sessionUser = await User.findOne({email: session.user?.email})
      //   session.user = sessionUser
      //   return session;
      // },
      async jwt({ token, account }) {
        // If the user is logging in, persist the accessToken in the token object
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      
      async session({ session, token ,user }) {
        session.user.accessToken = token?.accessToken as string;
        session.user.id = token?.id as string;
        return session;
    },

    
  },
  
  secret: process.env.NEXTAUTH_SECRET
}