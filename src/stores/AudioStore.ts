import { action, computed, observable, runInAction } from 'mobx'
import * as p5 from 'p5'
import 'p5/lib/addons/p5.sound'

import PitchDetection from '../pitch-detection/PitchDetection'

import { IAudioIn } from '../interfaces/p5'

const MAX_PITCH_HISTORY = 513

export interface IAudioStore {
  p5: p5 // Hmm
  mic: IAudioIn
  recorder: p5.SoundRecorder
  soundFile: p5.SoundFile
  crepe: PitchDetection | undefined
  pitchHistory: number[]
  pitchHistoryLength: number
  appendPitchHistory: (freq: number) => void
  recordAudio: () => void
  stopRecording: () => void
  playAudio: () => void
  stopAudio: () => void
  saveAudio: () => void
}

export class AudioStoreClass implements IAudioStore {
  @observable p5: any
  @observable mic = new p5.AudioIn() as IAudioIn
  @observable recorder = new p5.SoundRecorder()
  @observable soundFile = new p5.SoundFile()
  @observable crepe: PitchDetection | undefined
  @observable pitchHistory = [] as number[]

  @computed get pitchHistoryLength() {
    return this.pitchHistory.length
  }

  @action
  startMic(p: p5, audioContext: any) { // TODO any
    this.p5 = p
    this.mic.start(() => {
      runInAction(() => {
        this.crepe = new PitchDetection(audioContext, this.mic.stream)
      })
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

  @action
  recordAudio() {
    this.recorder.record(this.soundFile)
  }

  @action
  stopRecording() {
    this.recorder.stop()
  }

  @action
  playAudio() {
    this.soundFile.play()
  }

  @action
  stopAudio() {
    this.soundFile.stop()
  }

  @action
  saveAudio() {
    if (this.p5 && this.soundFile.buffer) {
      this.p5.saveSound(this.soundFile, 'sound-file.wav')
    }
  }
}

export const audioStore = new AudioStoreClass()
