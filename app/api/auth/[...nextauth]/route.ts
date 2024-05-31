import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectDB} from '@/utils/db'
import axios from 'axios';
import User  from '@/models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      

      try {
        console.log(profile)
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
});

export { handler as GET, handler as POST };