import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  width: 100%;
  min-height: 110px;
  padding: 1.5rem;
  margin-bottom: 1rem;

  background: ${props => props.theme.colors.gray.details};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 0.5rem;
  border: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  resize: vertical;

  svg,
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 10rem;

    --avatar: ${props => props.theme.colors.gray.background};
  }

  p {
    font-size: 1.4rem;
  }
  .footer {
    width: 100%;

    display: flex;
    justify-content: space-between;

    div,
    button {
      display: flex;
      align-items: flex-end;
      gap: 1rem;

      color: ${props => props.theme.colors.gray.dark};

      &:nth-last-of-type(2) {
        align-items: center;
      }
    }

    button {
      background: transparent;
      border: 0;

      cursor: pointer;
      transition: all 0.4s;

      &.liked {
        color: ${props => props.theme.colors.primary.normal};

        svg {
          fill: ${props => props.theme.colors.primary.normal};

          path {
            stroke: transparent;
          }
        }
      }
    }
  }

  &.highlighted {
    background: ${props => rgba(props.theme.colors.primary.normal, 0.1)};
    border: 1px solid ${props => rgba(props.theme.colors.primary.normal, 0.4)};

    footer .user-info span {
      color: ${props => props.theme.colors.logo};
    }
  }

  &.answered {
    background: ${props => props.theme.colors.gray.light};
    opacity: 0.4;
  }
`
