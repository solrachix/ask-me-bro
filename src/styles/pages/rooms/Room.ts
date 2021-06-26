import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 1.5rem;

  main {
    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 32px 0 24px 0;
      display: flex;
      align-items: center;

      h1 {
        font-size: 24px;
        color: ${props => props.theme.colors.logo};
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

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 16px;
        border-radius: 8px;
        background: ${props => props.theme.colors.gray.details};
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        resize: vertical;
        min-height: 130px;
      }
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;

      .user-info {
        display: flex;
        align-items: center;

        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        span {
          margin-left: 8px;
          color: ${props => props.theme.colors.logo};
          font-weight: 500;
          font-size: 14px;
        }
      }

      > span {
        font-size: 14px;
        color: ${props => props.theme.colors.gray.normal};
        font-weight: 500;

        button {
          background: transparent;
          color: ${props => props.theme.colors.primary.normal};
          border: 0;

          text-decoration: underline;
          font-size: 14px;

          cursor: pointer;
        }
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

        h4 {
          font-size: 1.2rem;
          font-weight: 600;
        }

        p {
          font-family: 'Roboto', sans-serif;
          font-weight: normal;
          font-size: 0.9rem;
        }
      }
    }
  }
`
