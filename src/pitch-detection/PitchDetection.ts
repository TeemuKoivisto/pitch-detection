/*
  Crepe Pitch Detection model
  https://github.com/marl/crepe/tree/gh-pages
  https://marl.github.io/crepe/crepe.js
*/

import * as tf from '@tensorflow/tfjs'

export default class PitchDetection {

  audioContext: AudioContext
  stream: MediaStream
  model: tf.Model
  results: { confidence: string, result: string } = { confidence: '', result: '' }
  running: boolean
  private readonly centMapping: tf.Tensor<tf.Rank> = tf.add(tf.linspace(0, 7180, 360), tf.tensor(1997.3794084376191))

  constructor(audioContext: AudioContext, stream: MediaStream) {
    this.audioContext = audioContext
    this.stream = stream
    this.loadModel()
  }

  async loadModel() {
    this.model = await tf.loadModel('model/model.json')
    this.initAudio()
  }

  initAudio() {
    if (this.audioContext) {
      try {
        this.processStream(this.stream)
      } catch (e) {
        throw new Error(`Error: Could not access microphone - ${e}`)
      }
    } else {
      throw new Error('Could not access microphone - getUserMedia not available')
    }
  }

  processStream(stream: MediaStream) {
    const mic = this.audioContext.createMediaStreamSource(stream)
    const minBufferSize = (this.audioContext.sampleRate / 16000) * 1024
    let bufferSize = 4
    while (bufferSize < minBufferSize) bufferSize *= 2

    const scriptNode = this.audioContext.createScriptProcessor(bufferSize, 1, 1)
    scriptNode.onaudioprocess = this.processMicrophoneBuffer.bind(this)
    const gain = this.audioContext.createGain()
    gain.gain.setValueAtTime(0, this.audioContext.currentTime)

    mic.connect(scriptNode)
    scriptNode.connect(gain)
    gain.connect(this.audioContext.destination)

    if (this.audioContext.state !== 'running') {
      console.warn('User gesture needed to start AudioContext, please click')
    }
  }

  static resample(audioBuffer: AudioBuffer, onComplete: (resampled: Float32Array) => void) {
    const interpolate = (audioBuffer.sampleRate % 16000 !== 0)
    const multiplier = audioBuffer.sampleRate / 16000
    const original = audioBuffer.getChannelData(0)
    const subsamples = new Float32Array(1024)
    for (let i = 0; i < 1024; i += 1) {
      if (!interpolate) {
        subsamples[i] = original[i * multiplier]
      } else {
        const left = Math.floor(i * multiplier)
        const right = left + 1
        const p = (i * multiplier) - left
        subsamples[i] = (((1 - p) * original[left]) + (p * original[right]))
      }
    }
    onComplete(subsamples)
  }

  processMicrophoneBuffer(event: AudioProcessingEvent) {
    PitchDetection.resample(event.inputBuffer, (resampled: Float32Array) => {
      tf.tidy(() => {
        this.running = true
        const frame = tf.tensor(resampled.slice(0, 1024))
        const zeromean = tf.sub(frame, tf.mean(frame))
        const normDS = tf.norm(zeromean).dataSync() as any // TODO
        const framestd = tf.tensor(normDS / Math.sqrt(1024))
        const normalized = tf.div(zeromean, framestd)
        const input = normalized.reshape([1, 1024])
        const predictTensor = this.model.predict([input]) as tf.Tensor<tf.Rank>
        const activation = predictTensor.reshape([360])
        const confidence = activation.max().dataSync()[0]
        const center = activation.argMax().dataSync()[0]
        this.results.confidence = confidence.toFixed(3)

        const start = Math.max(0, center - 4)
        const end = Math.min(360, center + 5)
        const weights = activation.slice([start], [end - start])
        const cents = this.centMapping.slice([start], [end - start])

        const products = tf.mul(weights, cents)
        const productsDS = products.dataSync() as Int32Array
        const productSum = productsDS.reduce((a: number, b: number) => a + b, 0)
        const weightDS = weights.dataSync() as Int32Array
        const weightSum = weightDS.reduce((a: number, b: number) => a + b, 0)
        const predictedCent = productSum / weightSum
        const predictedHz = 10 * ((predictedCent / 1200.0) ** 2)

        const result = (confidence > 0.5) ? `${predictedHz.toFixed(3)} +  Hz` : 'no voice'
        this.results.result = result
      })
    })
  }

  getResults() {
    return this.results
  }
}
