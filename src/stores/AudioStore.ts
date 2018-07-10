import { action, computed, observable } from 'mobx'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

// const MAX_PITCH_HISTORY = 10000

export interface IAudioStore {
  recorder: p5.SoundRecorder | undefined,
  soundFile: p5.SoundFile | undefined,
  pitchHistory: number[]
  pitchHistoryLength: number
  appendPitchHistory: (freq: number) => void
}

export class AudioStoreClass implements IAudioStore {
  @observable audio = undefined
  @observable recorder = undefined
  @observable soundFile = undefined
  @observable pitchHistory = [] as number[]

  @computed get pitchHistoryLength() {
    return this.pitchHistory.length
  }

  @action
  appendPitchHistory = (freq: number) => {
    this.pitchHistory.push(freq)
  }
}

export const audioStore = new AudioStoreClass()
