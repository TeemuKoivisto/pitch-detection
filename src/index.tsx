import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { ThemeProvider } from 'styled-components'

import { stores } from './stores'
import { confMobx } from './stores/mobxConf'

import { defaultTheme } from './theme/defaultTheme'

// import { Routes } from './routes'
import FrontPage from './pages/FrontPage'

import './index.css'

confMobx()

render(
  <Provider {...stores}>
    <ThemeProvider theme={defaultTheme}>
      <FrontPage />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
