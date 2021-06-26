import { ReactNode, ReactElement } from 'react'

import { Container } from './styles'

interface ModalProps {
  children: ReactNode
  open?: boolean
  onClose: () => void
}

function Modal({ children, open = false, onClose }: ModalProps): ReactElement {
  if (!open) return null

  return (
    <Container onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </Container>
  )
}

export default Modal
