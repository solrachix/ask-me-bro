import { AppProps } from 'next/app'

import { PageTransition } from '@/components/PageTransition'

// import SmoothProvider from '@/lib/react-smooth-scrolling'

import Layout from '@/components/Layout'
import Context from '@/context'

export default function App({
  Component: SsrComponent,
  pageProps: ssrPageProps
}: AppProps) {

  return (
    <Context>
      <Layout>
        <PageTransition>
          {({ Component, pageProps }) => {
            return Component ? (
              <Component {...pageProps} />
            ) : (
              <SsrComponent {...ssrPageProps} />
            )
          }}
        </PageTransition>
      </Layout>
    </Context>
  )
}
