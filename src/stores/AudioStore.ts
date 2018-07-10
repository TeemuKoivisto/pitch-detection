import { action, computed, observable } from 'mobx'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

import PitchDetection from '../pitch-detection/PitchDetection'

import { IAudioIn } from '../interfaces/p5'

const MAX_PITCH_HISTORY = 513

export interface IAudioStore {
  mic: IAudioIn
  recorder: p5.SoundRecorder
  soundFile: p5.SoundFile
  crepe: PitchDetection | undefined
  pitchHistory: number[]
  pitchHistoryLength: number
  appendPitchHistory: (freq: number) => void
}

export class AudioStoreClass implements IAudioStore {
  @observable mic = new p5.AudioIn() as IAudioIn
  @observable recorder = new p5.SoundRecorder()
  @observable soundFile = new p5.SoundFile()
  @observable crepe: PitchDetection | undefined
  @observable pitchHistory = [] as number[]

  @computed get pitchHistoryLength() {
    return this.pitchHistory.length
  }

  @action
  startMic(audioContext: AudioContext) {
    this.mic.start(() => {
      this.crepe = new PitchDetection(audioContext, this.mic.stream)
    })
    this.recorder.setInput(this.mic)
  }

  @action
  appendPitchHistory = (freq: number) => {
    this.pitchHistory.push(freq)
    if (this.pitchHistory.length === MAX_PITCH_HISTORY) {
      this.pitchHistory.splice(0, 1)
    }
  }

}

export const audioStore = new AudioStoreClass()
