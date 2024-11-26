
import MainMenu from "./UI/mainMenu";






export function Footer() {



  return (
    <div className="fixed mx-auto max-w-7xl px-6 lg:px-8 inset-x-0 bottom-2  h-10 z-50 flex flex-row items-center justify-center bg-transparent  shadow-sm  md:hidden">
      <div className=" w-full rounded-t-lg  bg-bg-layer1 ">
        <MainMenu />
      </div>
    </div>


  )
}

