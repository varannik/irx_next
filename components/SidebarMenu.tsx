import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Switch, Tab, Tabs } from "@nextui-org/react";


import ForcastIcon from './UI/icons/ForcastIcon'
import GaugeIcon from './UI/icons/GaugeIcon'
import useMenuDrawerStore from '@/stores/useMenuDrawerStore'
import useProfileDrawerStore from '@/stores/useProfileDrawerStore'

import UserSign from './UserSign'
import MAIcon from './UI/icons/MAIcon'
import WeekdayIcon from './UI/icons/WeekDayIcon'

import useCalendarDrawerStore from '@/stores/useCalendarDrawerStore';
import useSelectedCalendar from '@/stores/useSelectedCalendarStore';
import BBIcon from './UI/icons/BBIcon';



const items = [
  {
    id: 1,
    icon: GaugeIcon,
    href: '/analytics/gauge',
    title: "Current Max & Min",
    current: true
  },
  {
    id: 2,
    icon: ForcastIcon,
    href: '/analytics/trend',
    title: "Trend",
    current: true
  },
  {
    id: 3,
    icon: MAIcon,
    href: '/analytics/ma',
    title: "Moving Avarage",
    current: true
  },
  {
    id: 4,
    icon: WeekdayIcon,
    title: "WeekDay",
    href: '/analytics/weekday',
    current: true
  },
  {
    id: 5,
    icon: BBIcon,
    title: "Bollinger Bands",
    href: '/analytics/bb',
    current: true
  },
  // More items...
]

export default function SidebarMenu() {
  const { openCalendar, setCalendarDrawerOpen } = useCalendarDrawerStore()
  const { currentCalendar, setCurrentCalendar } = useSelectedCalendar()
  const { openMenu, setMenuDrawerOpen } = useMenuDrawerStore();
  const { openProfile, setProfileDrawerOpen } = useProfileDrawerStore();

  return (
    <>
      <div>
        <Transition show={openMenu} as={Fragment}>
          <Dialog className="relative z-50" onClose={setMenuDrawerOpen}>
            <TransitionChild
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-bg-layer1 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div className="flex fixed inset-0 overflow-hidden">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >

                <DialogPanel className="relative flex w-full max-w-48 flex-1 ">
                  <div className="flex grow flex-col gap-y-5 overflow-hidden bg-gray-900 px-3 pb-2 ">
                    <nav className="flex flex-1 flex-col ">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
                        <li className='grow'>
                          <ul role="list" className="divide-y divide-slate-800 ">

                            {items.map((item) => (

                              <li key={item.id} className="px-1 py-4 hover:bg-slate-800 hover:rounded-md max-w-48">
                                <Link onClick={() => setMenuDrawerOpen(false)}
                                  href={item.href}>
                                  <div className='grid grid-cols-4 justify-start items-center'>
                                    <div className='w-8 '><item.icon /></div>
                                    <div className='text-xs col-span-3 text-gray-light'>{item.title}</div>
                                  </div>


                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <div className="flex flex-wrap gap-4 justify-center">
                          <div className=''>
                          Calendar Type
                            </div>
                          <Tabs key='calendar' radius={'md'} aria-label="Tabs radius"
                            color='default'
                            classNames={{
                              tabList: "bg-hov-c ",
                            }}
                            selectedKey={currentCalendar}
                            onSelectionChange={setCurrentCalendar} >

                            <Tab key='J' title="Persian" />

                            <Tab key='G' title="Gregorian" />

                          </Tabs>
                        </div>
                        <li className="">
                          <UserSign onClick={() => {
                            setProfileDrawerOpen(true)
                            setMenuDrawerOpen(false)
                          }} />
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>

  )
}
