
import * as p5 from 'p5'
import 'p5/lib/addons/p5.sound'

import { audioStore } from '../stores/AudioStore'
import { frequencyStore } from '../stores/FrequencyStore'

const CANVAS_SIZE = 754

export default function sketch(p: p5) {
  function createText(pitch: number) {
    const START_Y = 35, ROW_MARGIN = 35
    const { findClosestFrequency } = frequencyStore
    p.fill(0)
    if (isNaN(pitch)) {
      p.textSize(32)
      p.text('No voice', 10, START_Y)
    } else {
      p.text(pitch, 10, START_Y)
    }
    const closest = findClosestFrequency(pitch)
    p.text(closest[0][1], 10, START_Y + ROW_MARGIN * 1)
    p.text(closest[0][0], 10, START_Y + ROW_MARGIN * 2)
    p.text(closest[1], 10, START_Y + ROW_MARGIN * 3)
    p.noFill()
  }

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
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
          p.vertex(i, CANVAS_SIZE - pitch, 0, 255, p.height)
        }
      })
    }
    // Frequencies
    // p.stroke(225, 255, 0)
    for (let i = 0; i < FREQUENCIES.length; i += 1) {
      const freq = FREQUENCIES[i][1] as number
      p.line(0, CANVAS_SIZE - freq, p.width, CANVAS_SIZE - freq)
    }
    p.endShape()
  }
}
