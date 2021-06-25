import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { database } from '@/services/firebase'

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
  const router = useRouter()
  const { user } = useAuth()
  const { Toast, header, setRoomCode } = useGlobal()
  const { questions = Room.questions, title = Room.title } = useRoom(roomId)

  useEffect(() => {
    header.set(true)

    setRoomCode(roomId)

    return () => header.set(false)
  }, [])

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
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="comments">
          {questions !== [] ? (
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
    return {
      props: {
        roomId,
        Room
      }
    }
  }
