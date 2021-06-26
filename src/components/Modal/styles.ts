import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  position: fixed;
  top: 0;

  width: 100vw;
  height: 100vh;

  background: ${props => rgba(props.theme.colors.gray.background, 0.6)};
  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 20;

  .modal {
    width: 50%;
    min-height: 10rem;
    padding: 2rem;

    background: ${props => props.theme.colors.gray.details};
    border-radius: 1rem;
  }
`
