import GoogleProvider from 'next-auth/providers/google';
import {connectDB} from '@/utils/db'
import User  from '@/models/User';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      }),
    ],
    callbacks: {
      async signIn({ profile}) {
  
        try {
          await connectDB()
          const userExist = await User.findOne({email:profile?.email})
          if (!userExist) {
            await User.create({
              email: profile?.email,
              name: profile?.name,
              image: profile?.picture
            })
          }
  
          return true
  
        } catch(error){
          console.log(error)
          return false
        }
      },
      async session({ session }) {
        const sessionUser = await User.findOne({email: session.user?.email})
        session.user = sessionUser
        return session;
      },
    },
  }