import Profile from './Profile'
import Login from './Login'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/utils/auth';


export default async function LoginPage() {
    // Fetch data with caching applied in the external file
    const session = await getServerSession(authOptions);


  if (session){

    return <Profile />

  } else {

    return <Login />
  }

}


