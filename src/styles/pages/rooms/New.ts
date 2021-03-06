import styled from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside.mobile {
    display: none;

    z-index: 0;
  }

  aside.desktop {
    flex: 7;
    background: ${props => props.theme.colors.primary.normal};
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;

    img {
      max-width: 320px;
    }

    strong {
      font: 700 36px 'Poppins', sans-serif;
      line-height: 42px;
      margin-top: 16px;
    }

    p {
      font-size: 24px;
      line-height: 32px;
      margin-top: 12px;
      color: #f8f8f8;
    }
  }

  main {
    flex: 8;

    padding: 0 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 5;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    align-items: stretch;
    text-align: center;

    > svg {
      width: 7.8rem;

      align-self: center;
    }

    h2 {
      font-size: 24px;
      margin: 64px 0 24px;
    }

    form {
      input {
        height: 50px;
        padding: 0 16px;

        background: ${props => rgba(props.theme.colors.shadow, 0.25)};
        border: 1px solid ${props => rgba(props.theme.colors.gray.normal, 0.3)};
        border-radius: 8px;
        backdrop-filter: blur(10px);
      }

      button {
        margin-top: 16px;
      }

      button,
      input {
        width: 100%;
      }
    }

    p {
      font-size: 14px;
      color: #737380;
      margin-top: 16px;

      a {
        color: ${props => props.theme.colors.primary.normal};
      }
    }
  }

  .create-room {
    margin-top: 64px;
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: ${props => props.theme.colors.secondary};
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    img {
      margin-right: 8px;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 620px) {
    aside.desktop {
      display: none;
    }

    aside.mobile {
      position: absolute;
      width: 100%;
      height: 100%;

      transform: translateX(-33%);

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`
