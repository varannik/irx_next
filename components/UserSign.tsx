'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'

export default function UserSign({ ...props }) {

    const { data: session, status } = useSession()
    console.log(session)

    if (status === "authenticated") {

        return (
            <>
                <div className="grid justify-center h-12 w-12 hover:bg-slate-800 hover:rounded-full">
                    <button {...props} className=" text-xs leading-6 text-white">
                        <Image
                            width={100}
                            height={100}
                            className="h-10 w-10 rounded-full bg-gray-800"
                            src={String(session.user?.image)}
                            alt=""
                        />
                    </button>
                </div>

            </>

        )

    } else {

        return (
            <div className="grid justify-center h-12 hover:bg-slate-800 hover:rounded-lg">
                <button {...props} className="">
                    <ArrowRightEndOnRectangleIcon className="h-9 w-8" />
                </button>
            </div>

        )
    }
}

