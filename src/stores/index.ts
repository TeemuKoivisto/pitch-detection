import { audioStore, IAudioStore } from './AudioStore'
import { frequencyStore, IFrequencyStore } from './FrequencyStore'

export interface IStores {
  audioStore: IAudioStore
  frequencyStore: IFrequencyStore
}

export const stores = {
  audioStore,
  frequencyStore,
}
