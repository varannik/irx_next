'use client'

import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { Logo } from './QuanticalLogo'

import useProfileDrawerStore from '@/stores/useProfileDrawerStore'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Card } from './UI/cardTremor'



export default function Login() {

  const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();


  return (
    <Transition show={openProfile} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setProfileDrawerOpen}>
        <div className="fixed inset-0 bg-gray-900/80"  />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl">
                  <div className="flex min-h-full flex-col items-center  justify-center sm:px-6 lg:px-8 gap-4">

                    
                    <Card className='flex flex-col  items-center justify-center'>
                    <Logo className='h-10 w-36' />

                      
                   
                    <h2 className="text-center text-sm leading-9 tracking-tight text-gray-mid">
                        Sign in to your account
                      </h2>

                    <Link
                      href=""
                      onClick={()=> signIn('google')}
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                      >
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 50 50">
                      <linearGradient id="IBg3RXm_dSiDzMfLOZC7Oa_HQHLvLjkXo0R_gr1" x1="-5.978" x2="41.081" y1="16.837" y2="44.007" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e8e189"></stop><stop offset="1" stop-color="#8f4433"></stop></linearGradient><path fill="url(#IBg3RXm_dSiDzMfLOZC7Oa_HQHLvLjkXo0R_gr1)" d="M12,24c0,1.43,0.25,2.79,0.71,4.06L9.506,30.7L6.2,33.08v0.03C4.79,30.38,4,27.28,4,24	c0-3.36,0.83-6.53,2.31-9.31l3.314,2.21l3.246,2.6C12.31,20.89,12,22.41,12,24z"></path><linearGradient id="IBg3RXm_dSiDzMfLOZC7Ob_HQHLvLjkXo0R_gr2" x1="17.363" x2="43.183" y1="-22.82" y2="48.12" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#faf3df"></stop><stop offset="1" stop-color="#344878"></stop></linearGradient><path fill="url(#IBg3RXm_dSiDzMfLOZC7Ob_HQHLvLjkXo0R_gr2)" d="M44,24c0,5.88-2.55,11.18-6.59,14.83c0-0.01,0-0.01,0-0.02L34,37l-2.78-3.43	c1.86-1.4,3.29-3.33,4.08-5.57H28c-2.209,0-4-1.791-4-4v-4h19.61C43.86,21.27,44,22.66,44,24z"></path><linearGradient id="IBg3RXm_dSiDzMfLOZC7Oc_HQHLvLjkXo0R_gr3" x1="-15.114" x2="44.303" y1="11.75" y2="11.75" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe2a6"></stop><stop offset="1" stop-color="#903a51"></stop></linearGradient><path fill="url(#IBg3RXm_dSiDzMfLOZC7Oc_HQHLvLjkXo0R_gr3)" d="M37.62,9.38l-2.916,2.916c-1.473,1.473-3.699,1.753-5.58,0.857C27.571,12.414,25.836,12,24,12	c-5.04,0-9.35,3.1-11.13,7.5l-6.56-4.81v-0.01C9.65,8.32,16.32,4,24,4C29.27,4,34.05,6.05,37.62,9.38z"></path><linearGradient id="IBg3RXm_dSiDzMfLOZC7Od_HQHLvLjkXo0R_gr4" x1="38.5" x2="6.232" y1="16.058" y2="54.515" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fffd94"></stop><stop offset="1" stop-color="#355954"></stop></linearGradient><path fill="url(#IBg3RXm_dSiDzMfLOZC7Od_HQHLvLjkXo0R_gr4)" d="M37.41,38.81c0,0.01,0,0.01,0,0.02C33.86,42.05,29.16,44,24,44c-7.77,0-14.49-4.43-17.8-10.89	v-0.03l6.51-5.02C14.37,32.69,18.79,36,24,36c2.71,0,5.21-0.9,7.22-2.43L37.41,38.81z"></path>
                      </svg>
                      <span className="text-sm font-semibold leading-6">google</span>
                      </Link>
                      </Card>

                  </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


// 'use client'
// import { useSession, signIn, signOut } from "next-auth/react";
// import { Container } from '@/components/Container'
// import LoginPage from '@/components/SigninProfile'


// export default function Home() {

//   return (
//           <>
//             <Container className="mt-9">
//               <div className="max-w-2xl">
//               <h1> Home Page </h1>
//                     <button onClick={()=> signIn('google')}>Sign In</button>
//                     <button onClick={()=> signOut()}>Sign Out</button>

                    

//                     {/* <LoginPage /> */}
//               </div>
//             </Container>
//           </>
//   );
// }



