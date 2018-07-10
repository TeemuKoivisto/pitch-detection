import { audioStore, IAudioStore } from './AudioStore'

export interface IStores {
  audioStore: IAudioStore,
}

export const stores = {
  audioStore,
}
