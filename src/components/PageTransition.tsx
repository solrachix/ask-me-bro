import { ReactElement, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTransition, animated, config } from 'react-spring'

import { useRouter } from '@/hooks/useRouter'

interface Props {
  children: (unknown) => ReactNode
}

export const PageTransition = ({ children }: Props): ReactElement => {
  const router = useRouter()
  const [isBrowser, setIsBrowser] = useState(false)

  const transitions = useTransition(router, router => router.pathname, {
    from: { opacity: 0, transform: 'translateX(-1000px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(200px)' },
    config: config.stiff
  })

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <>
      {isBrowser &&
        transitions.map(({ item, props: style, key }) => {
          if (!item.components) {
            return null
          }

          const { Component, props } = item.components[item.pathname]

          return (
            <Page style={style} key={key}>
              {children(
                item ? { Component, pageProps: props && props.pageProps } : {}
              )}
            </Page>
          )
        })}
    </>
  )
}

const Page = styled(animated.div)`
  min-width: 100%;
  width: 100vw;
`
