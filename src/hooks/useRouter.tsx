/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore

import React, { useContext } from 'react'
import { withRouter } from 'next/router'

import Home from '@/pages'

const Context = React.createContext<Route>({
  asPath: '/',
  basePath: '',
  components: {
    '/': Home
  },
  isFallback: false,
  isReady: true,
  pathname: '/',
  route: '/'
})

interface Route {
  asPath: string
  back(): void
  basePath: string
  beforePopState(): void
  components: unknown
  defaultLocale: undefined
  events: { on(): void; off(): void; emit(): void }
  isFallback: false
  isReady: boolean
  locale: undefined
  locales: undefined
  pathname: string
  prefetch(): void
  push(): void
  query: unknown
  reload(): void
  replace(): void
  route: string
}

const Provider = ({ router, children }) => (
  <Context.Provider value={router}>{children}</Context.Provider>
)

export const useRouter = (): Route => useContext(Context)
export const RouterContextProvider = withRouter(Provider)
