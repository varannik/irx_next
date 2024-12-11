import { signOut } from 'next-auth/react'
import {
    ArrowLeftStartOnRectangleIcon

} from '@heroicons/react/24/outline'
export function logoutButton() {



    return (
        <button onClick={() => signOut()}
            type="button"
            className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            Log out
        </button>
    )
}


