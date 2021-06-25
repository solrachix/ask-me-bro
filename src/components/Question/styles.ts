import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 130px;
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

    div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`
