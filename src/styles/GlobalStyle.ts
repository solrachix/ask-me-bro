import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #__next {
    background: ${props => props.theme.colors.background.normal};
    color: ${props => props.theme.colors.text.normal};

    overflow-x: visible;
  }

  #__next {
    width: 100vw;
    height: 100vh;
  }

  @media (max-width: 1366px) {
    html {
      font-size: 80%;
    }
  }

  @media (max-width: 1088px){
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px){
    html {
      font-size: 87.5%;
    }
  }


  body, input, textarea, button, select, a {
    color: inherit;
    outline: none;

    text-decoration: none;
    font-family: 'Nunito', 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.title};
    font-family: 'Poppins', sans-serif;

    word-break: break-word;
  }
  h1 {
    font-size: 10rem;
    font-weight: 600;
    letter-spacing: -1px;
    word-break: break-all;

    @media (max-width: 576px) {
      font-size: 6rem;
      line-height: 6rem;
    }
  }

  button {
    cursor: pointer;
  }
  input[type=search] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    font-family: inherit;
    font-size: 100%;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 4px;
    background: ${({ theme }) => theme.colors.background.normal};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => rgba(theme.colors.background.lighter, 1)};
    border-radius: 50px;
  }
  ::selection {
    background: ${({ theme }) => theme.colors.primary.normal};
  }
`
