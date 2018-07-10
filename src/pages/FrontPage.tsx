import * as React from 'react'
// import { inject } from 'mobx-react'
import { observer, inject } from 'mobx-react'
import p5 from 'p5'

import P5Wrapper from '../p5/P5Wrapper'
import sketch from '../p5/sketch'
import PitchDetection from '../pitch-detection/PitchDetection'

interface IFrontPageInjectedProps {
  audioStore: {
    mic: p5.AudioIn
    recorder: p5.SoundRecorder
    soundFile: p5.SoundFile
    crepe: PitchDetection | undefined
    pitchHistory: number[]
    pitchHistoryLength: number
    appendPitchHistory: (freq: number) => void
    recordAudio: () => void
    stopRecording: () => void
    playAudio: () => void
    saveAudio: () => void
  }
}

interface IFrontPageState {
  recordingState: number
}

@inject('audioStore')
@observer
export class FrontPage extends React.Component<{}, IFrontPageState> {

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
      this.switchRecordingState(recordingState)
    }
  }

  switchRecordingState(state: number) {
    const props = this.injected.audioStore
    console.log(props)
    switch (state) {
      case 1:
        props.recordAudio()
        break
      case 2:
        props.stopRecording()
        break
      case 3:
        props.playAudio()
        props.saveAudio()
        break
      default:
        break
    }
  }

  public render() {
    const { crepe, pitchHistory, pitchHistoryLength } = this.injected.audioStore
    return (
      <div className="app-container">
        { pitchHistoryLength }
        <div>
          <button onClick={this.handleRecordClick}>{this.recordButtonText}</button>
        </div>
        <P5Wrapper sketch={sketch} crepe={crepe} pitchHistory={pitchHistory} ref={this.p5Ref}/>
      </div>
    )
  }
}

// export const FrontPage = inject((stores: IStores) => ({
//   mic: stores.audioStore.pitchHistory,
//   pitchHistory: stores.audioStore.pitchHistory,
//   pitchHistoryLength: stores.audioStore.pitchHistoryLength,
//   appendPitchHistory: stores.audioStore.appendPitchHistory,
// }))(FrontPageClass)
