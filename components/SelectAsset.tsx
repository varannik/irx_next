
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import AssetsList from './UI/assetslist'
import useAssetDrawerStore from '@/stores/useAssetDrawerStore'


export default function SelectAsset() {
  const {openAsset, setAssetDrawerOpen} = useAssetDrawerStore()

  return (
    <Transition show={openAsset}>
      <Dialog className="relative z-50 " onClose={setAssetDrawerOpen}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="flex fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-52">
                  <div className="flex h-full flex-col overflow-y-scroll bg-transparent py-6 shadow-xl">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <AssetsList />
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



