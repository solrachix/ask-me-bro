import styled from 'styled-components'

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
  }
`
