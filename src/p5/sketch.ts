
// import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

import { audioStore } from '../stores/AudioStore'
import { frequencyStore } from '../stores/FrequencyStore'

export default function sketch(p: any) {
  function createText(pitch: number) {
    const { findClosestFrequency } = frequencyStore
    p.fill(0)
    if (isNaN(pitch)) {
      p.text('No voice', 10, 35)
    }
    const closest = findClosestFrequency(pitch)
    p.text(pitch, 10, 35)
    p.text(closest[0][1], 10, 50)
    p.text(closest[0][0], 10, 65)
    p.text(closest[1], 10, 80)
    p.noFill()
  }

  p.setup = function () {
    p.createCanvas(512, 512)
    p.noFill()
    audioStore.startMic(p, p.getAudioContext())
  }

  p.draw = function () {
    const { crepe } = audioStore
    const { pitchHistory, appendPitchHistory, FREQUENCIES } = frequencyStore

    p.background(200)
    p.beginShape()
    if (crepe) {
      const pitch = crepe.getResults()
      if (pitch) {
        const freq = parseFloat(pitch['result'].split(' ')[0])
        createText(freq)
        appendPitchHistory(freq)
      }
      // p.stroke(255, 255, 0)
      pitchHistory.map((pitch: number, i: number) => {
        if (!isNaN(pitch)) {
          p.vertex(i, 512 - pitch, 0, 255, p.height, 0)
        }
      })
    }
    // Frequencies
    // p.stroke(225, 255, 0)
    for (let i = 0; i < FREQUENCIES.length; i += 1) {
      const freq = FREQUENCIES[i][1] as number
      p.line(0, 512 - freq, p.width, 512 - freq)
    }
    p.endShape()
  }
}
