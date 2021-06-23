import { useRouter } from 'next/router'
import React from 'react'

import { useAuth } from '@/context/auth'

import SEO from '@/components/SEO'
import Button from '@/components/Button'
import Separator from '@/components/Separator'
import { Container } from '@/styles/pages/Auth'

export default function Auth(): React.ReactElement {
  const router = useRouter()
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      console.log(signInWithGoogle)
      await signInWithGoogle()
    }

    router.push('/rooms/new')
  }
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src="/images/icons/google-icon.svg" alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <Separator>ou entre em uma sala</Separator>

          <form action="">
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </Container>
  )
}
