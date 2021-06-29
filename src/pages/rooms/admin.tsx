import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { database } from '@/services/firebase'
import TMI from 'tmi.js'

import { useAuth } from '@/context/auth'
import { useGlobal } from '@/context/global'
import { useRoom } from '@/hooks/useRoom'

import DeleteIcon from '@/assets/delete.svg'
import CheckIcon from '@/assets/check.svg'
import AnswerIcon from '@/assets/answer.svg'

import Question from '@/components/Question'
import { Container } from '@/styles/pages/rooms/Admin'

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

  likes?: {
    authorId: string
  }[]
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
  const router = useRouter()
  const { user } = useAuth()
  const { Toast, header, setRoomCode } = useGlobal()
  const {
    questions = Room?.questions,
    title = Room?.title,
    twitchChannelName
  } = useRoom(roomId)

  useEffect(() => {
    header.set(true, [
      {
        title: 'Encerrar sala',
        onClick: () => handleEndRoom()
      }
    ])

    setRoomCode(roomId)

    return () => header.set(false)
  }, [])

  useEffect(() => {
    if (twitchChannelName) {
      const client = new TMI.Client({
        channels: [twitchChannelName]
      })

      client.connect()

      client.on('message', async (channel, tags, message, self) => {
        const hashtag = '#duvida'
        // console.log(`${tags['display-name']}: ${message}`)

        if (
          tags['reply-parent-msg-body']?.includes(hashtag) &&
          message.includes('#up')
        ) {
          const userId = tags['user-id'] || ''
          const question = await database.ref(`rooms/${roomId}/questions`).get()

          for (const [key, value] of Object.entries(question.val()) as [
            string,
            Question
          ][]) {
            const isMessage = value.content === tags['reply-parent-msg-body']

            if (isMessage) {
              const likes = value.likes || {}

              const isLiked = Object.entries(likes)?.find(
                ([key, like]) => like.authorId === userId
              )
              console.log(isLiked)

              if (isLiked) {
                database
                  .ref(`rooms/${roomId}/questions/${key}/likes/${isLiked[0]}`)
                  .remove()
              } else {
                database.ref(`rooms/${roomId}/questions/${key}/likes`).push({
                  authorId: userId
                })
              }

              break
            }
          }
        }

        if (message.includes(hashtag)) {
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
        }
      })
    }
  }, [twitchChannelName])

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    router.push('/rooms/new')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <Container>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions?.length > 0 && (
            <span>{questions?.length} pergunta(s)</span>
          )}
        </div>

        <div className="comments">
          {questions?.length > 0 ? (
            questions.map(question => (
              <Question key={question.id} {...question}>
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <CheckIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <AnswerIcon />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <DeleteIcon />
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
