import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { database } from '@/services/firebase'

import { useAuth } from '@/context/auth'
import { useGlobal } from '@/context/global'

import Logo from '@/assets/logo.svg'

import SEO from '@/components/SEO'
import Button from '@/components/Button'
import Separator from '@/components/Separator'
import { Container } from '@/styles/pages/Auth'

export default function Auth(): React.ReactElement {
  const router = useRouter()
  const { Toast } = useGlobal()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      console.log(signInWithGoogle)
      await signInWithGoogle()
    }

    router.push('/rooms/new')
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      Toast({
        type: 'error',
        message: 'Digite alguma coisa!'
      })

      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      Toast({
        type: 'error',
        message: 'Essa Sala não existe.'
      })
      return
    }

    router.push(`/rooms/${roomCode}`)
  }

  return (
    <Container>
      <SEO title="Auth" />
      <aside className="desktop">
        <img
          src="/images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <aside className="mobile">
        <img
          src="/images/illustration-mobile.svg"
          alt="Ilustração simbolizando perguntas e respostas"
        />
      </aside>

      <main>
        <div className="main-content">
          <Logo alt="Askmebro" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src="/images/icons/google-icon.svg" alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <Separator>ou entre em uma sala</Separator>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <img src="/images/icons/login.svg" alt="Icone de entrar" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </Container>
  )
}
