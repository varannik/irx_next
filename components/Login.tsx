'use client'

import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { Logo } from './QuanticalLogo'

import useProfileDrawerStore from '@/stores/useProfileDrawerStore'
import Link from 'next/link'
import { signIn } from 'next-auth/react'



export default function Login() {

  const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();


  return (
    <Transition show={openProfile} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setProfileDrawerOpen}>
        <div className="fixed inset-0" />

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
                  <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <Logo />
                      <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="#" method="POST">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                              Password
                            </label>
                            <div className="mt-2">
                              <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                Remember me
                              </label>
                            </div>

                            <div className="text-sm leading-6">
                              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                              </a>
                            </div>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Sign in
                            </button>
                          </div>
                        </form>

                        <div>
                          <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                              <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                              <span className="bg-white px-6 text-gray-900">Or continue with</span>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-1 gap-4">

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
                          </div>
                        </div>
                      </div>

                      <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                          Start a 14 day free trial
                        </a>
                      </p>
                    </div>
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



