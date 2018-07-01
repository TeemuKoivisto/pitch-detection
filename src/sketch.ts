
import PitchDetection from './PitchDetection'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

const frequencies = [
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
]

export default function sketch(p: any) {
  let mic: any
  let crepe: any
  const pitchHistory: number[] = []

  function startPitch() {
    crepe = new PitchDetection(p.getAudioContext(), mic.stream)
  }

  p.setup = function () {
    p.createCanvas(512, 512)
    p.noFill()
    mic = new p5.AudioIn()
    mic.start(startPitch)
  }

  p.draw = function () {
    p.background(200)
    p.beginShape()
    if (crepe) {
      const pitch = crepe.getResults()
      if (pitch) {
        const freq = parseFloat(pitch['result'].split(' ')[0])
        pitchHistory.push(freq)
        if (pitchHistory.length === 513) pitchHistory.splice(0, 1)
      }
      p.stroke(255, 255, 0)
      pitchHistory.map((pitch: number, i: number) => {
        if (!isNaN(pitch)) {
          p.vertex(i, 512 - pitch, 0, 255, p.height, 0)
        }
      })
    }
    // Frequencies
    p.stroke(226, 255, 0)
    for (let i = 0; i < frequencies.length; i += 1) {
      const freq = frequencies[i][1] as number
      p.line(0, 512 - freq, p.width, 512 - freq)
    }
    p.endShape()
  }
}
