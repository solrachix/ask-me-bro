import 'styled-components'

import { LightTheme } from '../styles/theme'

export type Theme = typeof LightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
