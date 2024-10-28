import useMenuDrawerStore from "@/stores/useMenuDrawerStore"
import useProfileDrawerStore from "@/stores/useProfileDrawerStore";
import clsx from "clsx";
import Link from "next/link";
import UserSign from "../UserSign";

const className = "flex items-center hover:rounded-lg justify-center bg-bg-layer1 basis-1/3 px-3 py-2 text-md text-text-active font-semibold  hover:bg-slate-800 focus:z-10"


export default function MainMenuDesktop(){

  const {setMenuDrawerOpen } = useMenuDrawerStore();
  const {setProfileDrawerOpen } = useProfileDrawerStore();

    return (

        <div className="flex m-2 lg:gap-5 divide-x lg:divide-x-0 divide-solid divide-div-diff  text-xs">
        <Link href={'/analytics/analytics'} className={clsx(className)}>
          Analytics
        </Link>
    
        <Link href={'/analytics/AI'} className={clsx(className)}>
          Forcast
        </Link>
        <button  onClick={() => {
                            setProfileDrawerOpen(true)
                            setMenuDrawerOpen(false)
                          }}
          type="button"
          className={clsx(className)}
        >
          {UserSign()}
        </button>
        </div>
    )

}


