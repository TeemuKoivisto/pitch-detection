import * as React from 'react'
import { inject } from 'mobx-react'

import P5Wrapper from '../p5/P5Wrapper'
import sketch from '../p5/sketch'

import { IStores } from '../stores'

interface IFrontPageInjectedProps {
  pitchHistory: number[]
  pitchHistoryLength: number
  appendPitchHistory: (freq: number) => void
}

interface IFrontPageState {
  recordingState: number
}

class FrontPageClass extends React.Component<{}, IFrontPageState> {

  private p5Ref: React.RefObject<P5Wrapper>

  constructor(props: {}) {
    super(props)
    this.p5Ref = React.createRef()
    this.state = {
      recordingState: 1,
    }
  }

  private get injected() {
    return this.props as IFrontPageInjectedProps
  }

  get recordButtonText() {
    switch (this.state.recordingState) {
      case 1:
        return 'Record'
      case 2:
        return 'Stop'
      case 3:
        return 'Play'
      default:
        return ''
    }
  }

  handleRecordClick = (e: React.MouseEvent) => {
    const { recordingState } = this.state
    if (recordingState === 3) {
      this.setState({
        recordingState: 1
      })
    } else {
      this.setState({
        recordingState: recordingState + 1
      })
    }
    if (this.p5Ref && this.p5Ref.current) {
      this.p5Ref.current.canvas.onRecordClick(recordingState)
    }
  }

  public render() {
    const { pitchHistoryLength } = this.injected
    return (
      <div className="app-container">
        { pitchHistoryLength }
        <div>
          <button onClick={this.handleRecordClick}>{this.recordButtonText}</button>
        </div>
        <P5Wrapper sketch={sketch} ref={this.p5Ref}/>
      </div>
    )
  }
}

export const FrontPage = inject((stores: IStores) => ({
  pitchHistory: stores.audioStore.pitchHistory,
  pitchHistoryLength: stores.audioStore.pitchHistoryLength,
  appendPitchHistory: stores.audioStore.appendPitchHistory,
}))(FrontPageClass)
