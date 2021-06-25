import cx from 'classnames'

import Avatar from '@/assets/avatar.svg'

import { Container } from './styles'

type QuestionProps = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered?: boolean
  isHighlighted?: boolean
  children?: React.ReactNode
}
function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps): React.ReactElement {
  return (
    <Container
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
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
        <div>{children}</div>
      </div>
    </Container>
  )
}

export default Question
