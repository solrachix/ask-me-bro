import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useState, FormEvent, useEffect } from 'react'

import { database } from '@/services/firebase'

import { useAuth } from '@/context/auth'
import { useGlobal } from '@/context/global'

import Button from '@/components/Button/index'
import Question from '@/components/Question'
import { Container } from '@/styles/pages/Room'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
  }
>

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

interface Room {
  title: string
  questions: Question[]
}

interface RoomServerSideProps {
  roomId: string
  Room: Room
}

type RoomProps = InferGetServerSidePropsType<
  GetServerSideProps<RoomServerSideProps>
>

export default function Room({ Room, roomId }: RoomProps): React.ReactElement {
  const { Toast, header, setRoomCode } = useGlobal()
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')

  useEffect(() => {
    header.set(true)

    setRoomCode(roomId)

    return () => header.set(false)
  }, [])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      Toast({
        type: 'error',
        message: 'You must be logged in'
      })
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <Container id="page-room">
      <main>
        <div className="room-title">
          <h1>Sala {Room.title}</h1>
          {Room.questions.length > 0 && (
            <span>{Room.questions.length} pergunta(s)</span>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntas?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="comments">
          {Room.questions !== [] ? (
            Room.questions.map(question => (
              <Question key={question.id} {...question} />
            ))
          ) : (
            <div className="no-comments">
              <img src="/images/empty-questions.svg" alt="empty questions" />
              <h4>Nenhuma pergunta por aqui...</h4>
              <p>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </p>
            </div>
          )}
        </div>
      </main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<RoomServerSideProps> =
  async context => {
    const { id: roomId } = context.query as { id: string }

    const roomRef = database.ref(`rooms/${roomId}`)

    let Room: Room | null

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        }
      )

      console.log({
        title: databaseRoom.title,
        questions: parsedQuestions
      })

      Room = {
        title: databaseRoom.title,
        questions: parsedQuestions
      }
    })
    return {
      props: {
        roomId,
        Room
      }
    }
  }
