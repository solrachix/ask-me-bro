import styled from 'styled-components'
import { rgba } from 'polished'

import { animated } from 'react-spring'

export const Container = styled(animated.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;

  background: ${props => rgba(props.theme.colors.gray.background, 0.6)};
  backdrop-filter: blur(6px);
  opacity: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 20;

  .modal {
    width: 50%;
    min-height: 10rem;
    padding: 2rem;

    transform: scale(0.5);
    background: ${props => props.theme.colors.gray.details};
    border-radius: 1rem;
  }

  @media (max-width: 620px) {
    .modal {
      width: calc(100% - 2rem);

      padding: 2rem;
    }
  }
`
