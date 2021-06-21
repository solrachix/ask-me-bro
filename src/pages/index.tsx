import React from 'react'

import SEO from '@/components/SEO'
import { Container } from '@/styles/pages/Home'

export default function Home(): React.ReactElement {
  return (
    <Container>
      <SEO title="Home" />
      Olá
    </Container>
  )
}
