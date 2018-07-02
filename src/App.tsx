import * as React from 'react'
import P5Wrapper from './P5Wrapper'

import sketch from './sketch'

class App extends React.Component {

  public render() {
    return (
      <div className="app-container">
        <P5Wrapper sketch={sketch} />
      </div>
    )
  }
}

export default App
