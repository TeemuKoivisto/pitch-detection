import * as React from 'react'
import * as p5 from 'p5'

interface IP5WrapperProps {
  sketch: (p: p5) => void
  crepe: any
  pitchHistory: number[]
}

export default class P5Wrapper extends React.Component<IP5WrapperProps, {}> {

  canvas: p5
  private p5wrapper: HTMLDivElement

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.p5wrapper)
  }

  componentWillReceiveProps(newProps: IP5WrapperProps) {
    if (this.props.sketch !== newProps.sketch) {
      this.p5wrapper.removeChild(this.p5wrapper.childNodes[0])
      this.canvas = new p5(newProps.sketch, this.p5wrapper)
    }
  }

  render() {
    return (
      <div ref={(wrapper: HTMLDivElement) => (this.p5wrapper = wrapper)}></div>
    )
  }
}
