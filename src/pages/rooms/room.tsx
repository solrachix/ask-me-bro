import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useState, FormEvent, useEffect } from 'react'

import { database } from '@/services/firebase'
import TMI from 'tmi.js'

import { useAuth } from '@/context/auth'
import { useGlobal } from '@/context/global'

import Like from '@/assets/like.svg'

import Button from '@/components/Button/index'
import Question from '@/components/Question'
import { Container } from '@/styles/pages/rooms/Room'
import { useRoom } from '@/hooks/useRoom'

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
    likes: Record<string, { authorId: string }>
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
  likeCount: number
  likeId: string | undefined
}

interface Room {
  title: string
  questions: Question[]
}

interface RoomServerSideProps {
  roomId: string
  Room?: Room
}

type RoomProps = InferGetServerSidePropsType<
  GetServerSideProps<RoomServerSideProps>
>

export default function Room({ Room, roomId }: RoomProps): React.ReactElement {
  const { user } = useAuth()
  const { Toast, header, setRoomCode } = useGlobal()
  const [newQuestion, setNewQuestion] = useState('')
  const {
    questions = Room?.questions,
    title = Room?.title,
    twitchChannelName
  } = useRoom(roomId)

  useEffect(() => {
    header.set(true)

    setRoomCode(roomId)

    return () => header.set(false)
  }, [])

  useEffect(() => {
    if (twitchChannelName) {
      const client = new TMI.Client({
        channels: [twitchChannelName]
      })

      client.connect()

      client.on('message', (channel, tags, message, self) => {
        console.log(`${tags['display-name']}: ${message}`)

        const question = {
          content: message,
          author: {
            name: tags['display-name'],
            avatar: ''
          },
          isHighlighted: false,
          isAnswered: false
        }

        database.ref(`rooms/${roomId}/questions`).push(question)
      })
    }
  }, [twitchChannelName])

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

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove()
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      })
    }
  }

  return (
    <Container id="page-room">
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions?.length > 0 && (
            <span>{questions?.length} pergunta(s)</span>
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
          {questions?.length > 0 ? (
            questions.map(question => (
              <Question key={question.id} {...question}>
                <button
                  className={`${question.likeId ? 'liked' : ''}`}
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() =>
                    handleLikeQuestion(question.id, question.likeId)
                  }
                >
                  {question.likeCount > 0 && <span>{question.likeCount}</span>}
                  <Like />
                </button>
              </Question>
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

    let Room: Room

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
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length
          }
        }
      )

      Room = {
        title: databaseRoom.title,
        questions: parsedQuestions
      }
    })

    if (Room) {
      return {
        props: {
          roomId,
          Room
        }
      }
    }

    return {
      props: {
        roomId
      }
    }
  }
