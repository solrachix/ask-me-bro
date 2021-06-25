import styled from 'styled-components'

export const Container = styled.div`
  main {
    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 32px 0 24px 0;
      display: flex;
      align-items: center;

      h1 {
        font-size: 24px;
        color: #29292e;
      }

      span {
        margin-left: 16px;
        padding: 8px 16px;

        background: ${props => props.theme.colors.tertiary};
        color: #fff;
        border-radius: 9999px;

        font-weight: 500;
        font-size: 14px;
      }
    }

    .comments {
      width: 100%;
      margin-top: 3.5rem;

      .no-comments {
        width: 100%;
        max-width: 284px;
        margin: auto;

        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h4,
        p {
          text-align: center;
        }
      }
    }
  }
`
