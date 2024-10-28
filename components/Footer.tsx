// import useAssetDrawerStore from "@/stores/useAssetDrawerStore";
// import useCalendarDrawerStore from "@/stores/useHeaderDrawerStore";
// import useMenuDrawerStore from "@/stores/useMenuDrawerStore"
// import { Bars3Icon , CurrencyDollarIcon} from "@heroicons/react/24/outline";
// import clsx from "clsx";
// import Link from "next/link";
import MainMenu from "./UI/mainMenu";






export function Footer() {



  return (
    <div className="fixed mx-auto max-w-7xl px-6 lg:px-8 inset-x-0 bottom-2  h-10 z-50 flex flex-row items-center justify-center bg-transparent  shadow-sm  lg:hidden">
      <div className=" w-full rounded-t-lg  bg-bg-layer1 ">
        <MainMenu />
      </div>
    </div>


  )
}

