import useAssetDrawerStore from "@/stores/useAssetDrawerStore";
import useCalendarDrawerStore from "@/stores/useCalendarDrawerStore";
import useMenuDrawerStore from "@/stores/useMenuDrawerStore"
import { Bars3Icon , CurrencyDollarIcon, CalendarIcon} from "@heroicons/react/24/outline";
import clsx from "clsx";

const tabs = [
  { name: 'My Account', href: '#', current: true },
  { name: 'Company', href: '#', current: false },
]

const className = "flex items-center hover:rounded-lg justify-center bg-bg-layer1 basis-1/3 px-3 py-2 text-sm font-semibold text-gray-900 div hover:bg-slate-800 focus:z-10"

export function Footer() {
  const {openMenu, setMenuDrawerOpen } = useMenuDrawerStore();
  const {openAsset, setAssetDrawerOpen} = useAssetDrawerStore()
  const {openCalendar, setCalendarDrawerOpen} = useCalendarDrawerStore()
  return (

    <div className="fixed inset-x-0 bottom-2 w-full h-10 z-50 flex flex-row items-center justify-center bg-transparent py-4 shadow-sm sm:px-6  ">
      <div className=" w-full lg:w-9/12 rounded-t-lg  bg-bg-layer1 ">
        <div className="flex m-2 divide-x divide-solid divide-div-diff  ">
        <button onClick={() => setMenuDrawerOpen(true)}
          type="button"
          className={clsx(className)}
        >
          <Bars3Icon  className="stroke-text-active h-6 w-6" aria-hidden="true" />
        </button>

        <button onClick={() => setCalendarDrawerOpen(true)}
          type="button"
          className={clsx(className)}
        >
          <CalendarIcon className="stroke-text-active h-6 w-6" aria-hidden="true" />
        </button>
        <button onClick={() => setAssetDrawerOpen(true)}
          type="button"
          className={clsx(className)}
        >
          <CurrencyDollarIcon className="stroke-text-active h-6 w-6" aria-hidden="true" />
        </button>
        </div>

      </div>
    </div>


  )
}

