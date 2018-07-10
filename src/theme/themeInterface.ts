export interface IThemeColor {
  textLight: string
  textDark: string
  bg: string
}

export interface ISize {
  borderWidth?: string
  fontSize?: string
  height?: string
  margin?: string
  padding?: string
  width?: string
}

export interface IThemeSizes {
  small: ISize
  medium: ISize
  large: ISize
}

export interface ITheme {
  color: IThemeColor
  button: {
    sizes: IThemeSizes
  }
}
