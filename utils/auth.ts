import GoogleProvider from 'next-auth/providers/google';
import {connectDB} from '@/utils/db'
import User  from '@/models/User';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async signIn({ profile, account}) {
        
  
        try {
          console.log(account)
          await connectDB()
  
          const userExist = await User.findOne({email:profile?.email})
  
          if (!userExist) {
            const user = await User.create({
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
        return session;
   
   
      },
    },
  
    jwt: {
      secret: process.env.JWT_SECRET,
      encryption: true,
    }
  }