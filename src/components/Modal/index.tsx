import { ReactNode, ReactElement, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import { Container } from './styles'

interface ModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
}

function Modal({ children, open, onClose }: ModalProps): ReactElement {
  const [style, animate] = useSpring(() => ({
    transform: 'scale(0.5)',
    opacity: 0
  }))

  useEffect(() => {
    if (open) {
      animate({ transform: 'scale(1)', opacity: 1, delay: 0 })
    } else {
      animate({ transform: 'scale(0.5)', opacity: 0, delay: 0 })
    }
  }, [open])

  return (
    <Container
      style={{
        opacity: style.opacity,
        pointerEvents: open ? 'all' : 'none'
      }}
      onClick={onClose}
    >
      <animated.div
        className="modal"
        style={style}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </animated.div>
    </Container>
  )
}

export default Modal
