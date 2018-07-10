import { action, computed, observable } from 'mobx'

const MAX_PITCH_HISTORY = 513

const FREQUENCIES = [
  ['C2', 65.41],
  ['C#2/Db2', 69.30],
  ['D2', 73.42],
  ['D#2/Eb2', 77.78],
  ['E2', 82.41],
  ['F2', 87.31],
  ['F#2/Gb2', 92.50],
  ['G2', 98.00],
  ['G#2/Ab2', 103.83],
  ['A2', 110.00],
  ['A#2/Bb2', 116.54],
  ['B2', 123.47],
  ['C3', 130.81],
  ['C#3/Db3', 138.59],
  ['D3', 146.83],
  ['D#3/Eb3', 155.56],
  ['E3', 164.81],
  ['F3', 174.61],
  ['F#3/Gb3', 185.00],
  ['G3', 196.00],
  ['G#3/Ab3', 207.65],
  ['A3', 220.00],
  ['A#3/Bb3', 233.08],
  ['B3', 246.94],
  ['C4', 261.63],
  ['C#4/Db4', 277.18],
  ['D4', 293.66],
  ['D#4/Eb4', 311.13],
  ['E4', 329.63],
  ['F4', 349.23],
  ['F#4/Gb4', 369.99],
  ['G4', 392.00],
  ['G#4/Ab4', 415.30],
  ['A4', 440.00],
  ['A#4/Bb4', 466.16],
  ['B4', 493.88]
] as [string, number][]

export interface IFrequencyStore {
  readonly FREQUENCIES: [string, number][]
  pitchHistory: number[]
  pitchHistoryLength: number
  appendPitchHistory: (freq: number) => void
  findClosestFrequency: (pitch: number) => [[string, number], number]
}

export class FrequencyStoreClass implements IFrequencyStore {
  FREQUENCIES = FREQUENCIES
  @observable pitchHistory = [] as number[]

  @computed get pitchHistoryLength() {
    return this.pitchHistory.length
  }

  @action
  appendPitchHistory = (freq: number) => {
    this.pitchHistory.push(freq)
    if (this.pitchHistory.length === MAX_PITCH_HISTORY) {
      this.pitchHistory.splice(0, 1)
    }
  }

  findClosestFrequency(pitch: number) {
    let closest: [string, number] = ['', -1]
    let diff = -1
    // debugger
    FREQUENCIES.forEach((freq: [string, number]) => {
      const currDiff = Math.abs(freq[1] - pitch)
      const oldDiff = Math.abs(freq[1] - closest[1])
      if (closest[1] === -1 || currDiff < oldDiff) {
        closest = freq
        diff = freq[1] - pitch
      }
    })
    return [closest, diff] as [[string, number], number]
  }
}

export const frequencyStore = new FrequencyStoreClass()
