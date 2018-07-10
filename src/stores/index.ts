import { audioStore, IAudioStore } from './AudioStore'

export interface IStores {
  errorStore: IAudioStore,
}

export const stores = {
  audioStore,
}
