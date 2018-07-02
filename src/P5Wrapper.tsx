import * as React from 'react'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

export default class P5Wrapper extends React.Component<any, any> {

  canvas: any
  wrapper: any

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper)
  }

  componentWillReceiveProps(newprops: any) {
    if (this.props.sketch !== newprops.sketch) {
      this.wrapper.removeChild(this.wrapper.childNodes[0])
      this.canvas = new p5(newprops.sketch, this.wrapper)
    }
  }

  render() {
    return (
      <div ref={(wrapper: any) => (this.wrapper = wrapper)}></div>
    )
  }
}
