import React from 'react'
import Link from 'next/link'

import SEO from '@/components/SEO'
import Button from '@/components/Button'
import { Container } from '@/styles/pages/NewRoom'

export default function Auth(): React.ReactElement {
  return (
    <Container>
      <SEO title="Auth" />
      <aside>
        <img
          src="/images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src="/images/icons/logo.svg" alt="Askmebro" />

          <h2>Criar uma nova sala</h2>
          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link href="#">
              <a>Clique aqui</a>
            </Link>
          </p>
        </div>
      </main>
    </Container>
  )
}
