'use client'

import { useSession } from "next-auth/react"



export default function UserSign() {

    const { data: session, status } = useSession()

    if (status === "authenticated") {

        const FirstName = session.user?.name?.split(" ")[0]

        return (FirstName)

    } else {

        return ("Profile")
    }
}

