'use client'

import LoginPage from './SigninProfile'
import { Footer } from './Footer'
import SelectAsset from './SelectAsset'
import SidebarMenu from './SidebarMenu'
import Header from './Header'
import SelectCalendar from './SelectCalendar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>

      <div>
        <Header />
        <SidebarMenu />
        <SelectCalendar />
        <LoginPage />
        <SelectAsset />
        <Footer />

        <main className="py-10 lg:pl-72 ">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  )
}