import * as styledComponents from 'styled-components'

import { ITheme } from './themeInterface'

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>

export { css, injectGlobal, keyframes, ThemeProvider }
export default styled
