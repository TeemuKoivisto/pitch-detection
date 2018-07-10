import * as React from 'react'
import P5Wrapper from './P5Wrapper'

import sketch from './sketch'

class App extends React.Component {

  private p5Ref: React.RefObject<P5Wrapper>

  constructor(props: {}) {
    super(props)
    this.p5Ref = React.createRef()
  }

  handleClick = (e: any) => {
    if (this.p5Ref && this.p5Ref.current) {
      this.p5Ref.current.canvas.onClick()
    }
  }

  public render() {
    return (
      <div className="app-container">
        <button onClick={this.handleClick}>Click</button>
        <P5Wrapper sketch={sketch} ref={this.p5Ref}/>
      </div>
    )
  }
}

export default App
