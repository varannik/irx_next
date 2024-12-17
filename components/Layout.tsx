import LoginPage from './SigninProfile'
import { Footer } from './Footer'
import SelectAsset from './SelectAsset'
import Header from './Header'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Header />
        <LoginPage />
        <SelectAsset />
        <Footer />
        <main >
          <div >{children}</div>
        </main>
    </>
  )
}