'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function UserSign({ ...props }) {

    const { data: session, status } = useSession()
    console.log(session)

    if (status === "authenticated") {

        return (
            <>
                <button {...props} className="w-full  flex  items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 ">
                    <Image
                        width={100}
                        height={100}
                        className="h-10 w-10 rounded-full bg-gray-800"
                        src={session.user?.image}
                        alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{session.user?.name}</span>

                </button>
            </>



        )

    } else {

        return (

            <button {...props} className="w-full  flex  items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 ">
                Sign in
            </button>
        )
    }



}
