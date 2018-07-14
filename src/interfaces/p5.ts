import * as p5 from 'p5'

export interface IAudioIn extends p5.AudioIn {
  amplitude: p5.Amplitude
  currentSource: null
  enabled: boolean
  input: GainNode
  mediaStream: MediaStreamAudioSourceNode
  output: GainNode
  stream: MediaStream
}
