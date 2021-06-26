import styled from 'styled-components'
import { rgba } from 'polished'

const Separator = styled.div.attrs(() => ({ className: 'separator' }))`
  font-size: 14px;
  color: ${props => rgba(props.theme.colors.gray.normal, 0.5)};

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => rgba(props.theme.colors.gray.normal, 0.5)};
    margin-right: 16px;
  }

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => rgba(props.theme.colors.gray.normal, 0.5)};
    margin-left: 16px;
  }
`

export default Separator
