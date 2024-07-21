'use client'

import Profile from './Profile'
import Login from './Login'

import { useSession } from "next-auth/react"



export default  function LoginPage () {
  const { data: session, status } = useSession()
  console.log(session)

  if (status === "authenticated"){

    return <Profile session = {session} />

  } else {

    return <Login />
  }

}


