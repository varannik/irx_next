import { Fragment } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import useSelectedCalendar from '@/stores/useSelectedCalendarStore'
import useCalendarDrawerStore from '@/stores/useHeaderDrawerStore'

import { Tab, Tabs } from '@nextui-org/react'


export default function SelectCalendar() {
  const { openCalendar, setCalendarDrawerOpen } = useCalendarDrawerStore()
  const { currentCalendar, setCurrentCalendar } = useSelectedCalendar()

  return (
    <Transition show={openCalendar}>
      <Dialog className="relative z-50" onClose={setCalendarDrawerOpen}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bottom-0  bg-bg-layer1 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="flex fixed inset-x-0 bottom-0  items-center justify-center overflow-hidden  ">

          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <DialogPanel className="rounded-t-lg h-30 flex bg-transparent">
              <div className=" flex items-center justify-center w-full lg:w-9/12   mb-2   divide-x divide-div-diff rounded-t-lg bg-bg-layer1  shadow-xl">

                <div className="flex flex-wrap gap-4">

                    <Tabs key='calendar' radius={'md'} aria-label="Tabs radius"  
                    color='default'
                    classNames={{
                      tabList: "bg-hov-c ",
                    }}
                    selectedKey={currentCalendar}
                    onSelectionChange={setCurrentCalendar} >
                    
                    <Tab key='J' title="Persian" />

                    <Tab key='G' title="Gregorian"/>
                    
                    </Tabs>
                </div>

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}