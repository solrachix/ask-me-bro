import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  margin: auto;
  padding-bottom: 10rem;

  * {
    font-family: 'Poppins', 'roboto';
  }

  header {
    width: 100%;
    padding: 1.6rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 7.8rem;
    }

    a {
      /* color: #fff; */
      font-size: 1.2rem;
      font-weight: 500;
      text-decoration: none;
    }
  }

  main {
    margin-top: 6.25rem;

    .title-box {
      width: 100%;
      max-width: 871px;
      margin: auto;

      display: flex;
      flex-direction: column;
      justify-content: center;

      h1,
      p {
        text-align: center;
      }

      h1 {
        line-height: 9rem;
        font-size: 9rem;
        font-weight: 800;

        background: ${props => props.theme.colors.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        margin-top: 1.2rem;
        font-size: 1.3rem;
      }

      button {
        width: 100%;
        max-width: 20rem;
        height: 4rem;
        margin: 3.25rem auto;

        background: ${props => props.theme.colors.gradient};
        color: #fff;
        border: 0;
        border-radius: 6rem;

        font-size: 1.2rem;
        font-weight: 600;
      }
    }

    .template-container {
      width: 100%;
      max-width: 1122px;
      height: 100%;
      max-height: 639px;
      margin-top: 6rem;

      &:before {
        content: '';
        position: absolute;
        width: inherit;
        max-width: inherit;
        height: inherit;
        max-height: inherit;

        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          ${props => props.theme.colors.gray.background} 114.32%
        );
      }

      svg {
        --details: ${props => props.theme.colors.gray.details};
        --background: ${props => props.theme.colors.gray.background};
        --gray-dark: ${props => props.theme.colors.gray.dark};
        --text: ${props => props.theme.colors.logo};
        --line: ${props => props.theme.colors.gray.normal};

        width: 100%;

        border-radius: 2rem;
        box-shadow: 0px -20px 40px 0px #737380bd;
      }
    }

    .companies {
      width: 100%;
      max-width: 675px;
      margin: 5.4rem auto;

      display: flex;
      justify-content: space-between;

      mix-blend-mode: color-dodge;
      opacity: 0.8;
    }

    .benefits {
      width: 90%;
      padding: 0 2rem;
      margin: 12.9rem auto;

      h5,
      h2,
      span {
        text-align: center;
      }

      h2 {
        margin-bottom: 5.25rem;

        font-size: 4rem;
        font-weight: 500;

        color: ${props => props.theme.colors.logo};
      }

      div {
        width: 100%;

        display: flex;
        justify-content: space-between;

        .mini-card {
          width: 28rem;
          padding: 2rem;

          display: flex;
          flex-direction: column;

          img {
            width: 100%;
          }
          h5 {
            font-size: 1.5rem;
            font-weight: 600;

            color: ${props => props.theme.colors.logo};
          }

          span {
            font-size: 1.3rem;
            font-weight: 00;
            line-height: 1.6rem;
          }
        }
      }
    }

    .card {
      img {
        position: absolute;
        right: 1%;
        transform: translateY(-16.5%);
      }
      .content {
        width: 100%;
        height: 432px;
        padding: 3.2rem 6rem;

        background: linear-gradient(139.44deg, #4347fe 0%, #ff59f8 96.19%);
        border-radius: 5rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;

        h3,
        span {
          max-width: 440px;
        }
        h3 {
          font-weight: 600;
          font-size: 2.5rem;
          line-height: 2.6rem;

          color: #fff;
        }

        span {
          font-size: 1.5rem;
          line-height: 1.9rem;

          color: #fff;
        }

        button {
          width: 12rem;
          height: 4rem;

          border-radius: 20px;
          background: #ffffff;

          filter: drop-shadow(10px 10px 50px rgba(0, 0, 0, 0.25));
          border: 0;

          span {
            font-weight: 500;
            font-size: 1.5rem;
            line-height: 1.9rem;

            background: ${props => props.theme.colors.gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }

  @media (max-width: 620px) {
    padding: 2rem;

    main {
      .title-box {
        width: 100%;
        max-width: 300px;

        h1 {
          line-height: 4rem;
          font-size: 4rem;
        }

        button {
          font-size: 1.4rem;
        }
      }

      .template-container {
        margin-top: 2rem;
      }

      .companies {
        img {
          width: 10rem;
        }
      }

      .benefits {
        width: 100%;
        margin: 6rem auto;
        padding: 0;

        h2 {
          font-size: 2.6rem;
          font-weight: 600;
        }

        & > div {
          flex-direction: column;

          .mini-card {
            width: 100%;
          }
        }
      }

      .card {
        margin-top: 2rem;

        img {
          width: 100%;
          right: 0;
          transform: translateY(-80%);
        }
        .content {
          width: 100%;
          height: 550px;
          padding: 2rem 2rem;

          border-radius: 3rem;

          justify-content: flex-end;
          align-items: center;

          h3,
          span {
            text-align: center;
          }

          h3 {
            font-size: 2rem;
            line-height: 2.6rem;
          }

          span {
            font-size: 1.1rem;
            line-height: 1.6rem;
          }

          button {
            border-radius: 1rem;
          }
        }
      }
    }
  }
`
