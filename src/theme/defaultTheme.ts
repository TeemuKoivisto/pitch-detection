import { ITheme } from './themeInterface'

export const defaultTheme : ITheme = {
  color: {
    textLight: '#666',
    textDark: '#222',
    bg: '#fff',
  },
  button: {
    sizes: {
      small: {
        fontSize: '14px',
        height: '30px',
        padding: '0 8px',
      },
      medium: {
        fontSize: '16px',
        height: '40px',
        padding: '0 12px',
      },
      large: {
        fontSize: '18px',
        height: '50px',
        padding: '0 16px',
      },
    }
  },
}
