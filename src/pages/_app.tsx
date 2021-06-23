import { AppProps } from 'next/app'

import { PageTransition } from '@/components/PageTransition'

// import SmoothProvider from '@/lib/react-smooth-scrolling'

import Context from '@/context'

import '@/services/firebase'

export default function App({
  Component: SsrComponent,
  pageProps: ssrPageProps
}: AppProps) {
  return (
    <Context>
      <PageTransition>
        {({ Component, pageProps }) => {
          return Component ? (
            <Component {...pageProps} />
          ) : (
            <SsrComponent {...ssrPageProps} />
          )
        }}
      </PageTransition>
    </Context>
  )
}
