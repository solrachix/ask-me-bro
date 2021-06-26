import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.header`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.gray.light};

  a svg {
    width: 7.8rem;
  }

  .content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
      max-height: 45px;
    }

    div {
      display: flex;
      gap: 1rem;

      .menu-button {
        max-height: 40px;
        padding: 1rem;

        &:not(:disabled):hover {
          filter: none;
        }

        svg {
          width: 2rem;

          color: #fff;
        }

        .menu {
          position: absolute;
          right: 4%;
          top: 10%;
          width: 10rem;
          padding: 1rem 0;

          background: ${props => props.theme.colors.gray.background};
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          color: ${props => props.theme.colors.gray.dark};
          border-radius: 1rem;
          opacity: 0;

          scale: 0.5;

          list-style: none;
          z-index: 20;

          li {
            width: 100%;
            padding: 1rem;

            font-weight: 600;

            &:hover {
              background: ${props => rgba(props.theme.colors.gray.light, 0.4)};
            }
          }
        }
      }
    }
  }
`
export const TwitchModal = styled.div`
  width: 100%;
  max-width: 360px;
  height: 100%;
  margin: auto;

  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;

  svg {
    width: 6rem;
  }

  h1 {
    font-size: 2rem;
    line-height: 2rem;
    color: ${props => props.theme.colors.logo};
  }

  input {
    width: 100%;
    height: 2rem;
    padding: 2rem;

    border-radius: 1rem;

    background: ${props => props.theme.colors.gray.background};
    border: 0;

    font-size: 1.4rem;
  }

  .buttons {
    width: 100%;

    display: flex;
    justify-content: space-between;
    gap: 2rem;

    button {
      width: 100%;
    }
    button:nth-last-of-type(2) {
      color: ${props => props.theme.colors.logo};
      background: ${props => props.theme.colors.gray.background};
    }
  }

  @media (max-width: 620px) {
    input {
      padding: 2rem;

      font-size: 1.4rem;
    }

    .buttons {
      gap: 1rem;
    }
  }
`
