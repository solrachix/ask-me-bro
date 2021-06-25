import Avatar from '@/assets/avatar.svg'
import Like from '@/assets/like.svg'

import { Container } from './styles'

type QuestionProps = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}
function Question({ author, content }: QuestionProps): React.ReactElement {
  return (
    <Container>
      <p>{content}</p>
      <div className="footer">
        <div>
          {author.avatar ? (
            <img src={author.avatar} alt="avatar " />
          ) : (
            <Avatar />
          )}
          <span>{author.name}</span>
        </div>
        <div>
          <span>16</span>
          <Like />
        </div>
      </div>
    </Container>
  )
}

export default Question
