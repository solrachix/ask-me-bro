import { ReactElement, ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button(props: ButtonProps): ReactElement {
  return <Container {...props} />
}

export default Button
