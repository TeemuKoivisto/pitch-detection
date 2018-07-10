import { observable } from 'mobx'
// import { action, computed, observable } from 'mobx'

export interface IAudioStore {
  audio: any
}

export class AudioStoreClass implements IAudioStore {
  @observable audio = undefined
}

export const audioStore = new AudioStoreClass()
