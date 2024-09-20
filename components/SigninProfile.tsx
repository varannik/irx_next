'use client'

import Profile from './Profile'
import Login from './Login'

import { useSession } from "next-auth/react"



export default  function LoginPage () {
  const { data: Session, status } = useSession()

  if (status === "authenticated" ){

    return <Profile session = {Session} />

  } else {

    return <Login />
  }

}


