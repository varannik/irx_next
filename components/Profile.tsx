'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import useProfileDrawerStore from '@/stores/useProfileDrawerStore'
import UserSession from '@/interfaces/UserSession'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

import {
  ArrowLeftStartOnRectangleIcon

} from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'


export default function Profile({session}:{session:UserSession}) {

  const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();
  console.log(session.user.image)

  return (
    <Transition show={openProfile} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setProfileDrawerOpen}>
        <div className="fixed inset-0 bg-gray-900/80" />
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
                    <div className="px-4 py-4 sm:px-4 sm:py-4">
                      <div className="flex items-start justify-between">
                        <h2 id="slide-over-heading" className="text-base font-semibold leading-6 text-white">
                          Profile
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setProfileDrawerOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="relative h-40 sm:h-56">
                            <img
                              className="absolute h-full w-full object-cover"
                              src={session.user.image}
                              alt=""
                            />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{session.user.name}</h3>
                                  <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                    <span className="sr-only">Online</span>
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">{session.user.email}</p>
                              </div>
                              <div className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">

                                <button onClick={()=> signOut()}
                                  type="button"
                                  className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  <ArrowLeftStartOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />

                                  Log out
                                </button>
                                <div className="ml-3 inline-flex sm:ml-0">
                                  <Menu as="div" className="relative inline-block text-left">
                                    <MenuButton className="inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                      <span className="sr-only">Open options menu</span>
                                      <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          <MenuItem>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                                )}
                                              >
                                                View profile
                                              </a>
                                            )}
                                          </MenuItem>
                                          <MenuItem>
                                            {({ active }) => (
                                              <a
                                                href="#"
                                                className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                                )}
                                              >
                                                Copy profile link
                                              </a>
                                            )}
                                          </MenuItem>
                                        </div>
                                      </MenuItems>
                                    </Transition>
                                  </Menu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Bio</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p>
                                Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus
                                feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum
                                aenean arcu.
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Location</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">New York, NY, USA</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Website</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">ashleyporter.com</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">Birthday</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <time dateTime="1988-06-23">June 23, 1988</time>
                            </dd>
                          </div>
                        </dl>
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



