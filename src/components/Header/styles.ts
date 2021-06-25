import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.header`
  --logo: ${props => props.theme.colors.logo};

  padding: 24px;
  border-bottom: 1px solid #e2e2e2;

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
