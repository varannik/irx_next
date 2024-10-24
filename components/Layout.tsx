'use client'

import LoginPage from './SigninProfile'
import { Footer } from './Footer'
import SelectAsset from './SelectAsset'
import SidebarMenu from './SidebarMenu'
import Header from './Header'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>


        <Header />
        <SidebarMenu />
        <LoginPage />
        <SelectAsset />
        <Footer />

        <main className="py-10 ">
          <div className="px-4 sm:px-6 lg:px-6">{children}</div>
        </main>
    </>
  )
}