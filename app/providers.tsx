'use client'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react"
import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { Session } from 'next-auth'

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children, session }: { children: React.ReactNode ,session:Session}) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <SessionProvider session={session}>
      <AppContext.Provider value={{ previousPathname }}>
        <NextUIProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <ThemeWatcher />
            {children}
          </ThemeProvider>
        </NextUIProvider>
      </AppContext.Provider>
    </SessionProvider>
  )
}

