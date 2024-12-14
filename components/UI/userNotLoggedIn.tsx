'use client'

import useProfileDrawerStore from "@/stores/useProfileDrawerStore";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";


export function UserNotLoggedIn() {

    const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();



    return (
        <div className="grid min-h-full place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">

                <h1 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-text-active sm:text-7xl">Access to the forecast page is restricted to authenticated users.</h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8"> Please log in to view the latest forecasts and also make your own. </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                
                <Link href={'/analytics'} className="text-sm font-semibold text-text-active">
                     <span aria-hidden="true">&rarr;</span> Back to Analytics
                </Link>

                <Button onClick={()=>setProfileDrawerOpen(true)} color="primary" variant="bordered">
                        Login
                </Button>
                    


                </div>
            </div>
        </div>
    )
}


