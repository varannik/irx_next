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

        <main className="mt-14">
          <div className="container mx-auto max-w-7xl px-6">{children}</div>
        </main>
    </>
  )
}