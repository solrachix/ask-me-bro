import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import SEO from '@/components/SEO'
import { Container } from '@/styles/pages/Home'

export default function Home() {

  return (
    <Container>
      <SEO title="Home" />

     Olá
    </Container>
  )
}
