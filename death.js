// Create a LifxLan object
const Lifx = require('node-lifx-lan')
var ColorTween = require('color-tween') // Omit for browser use
const { execFile } = require('child_process')
const { join } = require('path')

let normal = '#fad066'
let eventColour = '#ec563f'

// timeout:
// setTimeout(() => clearInterval(_handle), 20 * 1000)

const deaths = new Array(4).fill('dX.wav')
  .map((n, i) => n.replace('X', i + 1) + '')
  .map(p => join(__dirname, p))
  .sort(v => Math.random() - .5)

let _last = deaths[0]

setEventRate(2 * 60 * 1000)

function getDeath (last, arr = deaths) {
  let next = last
  while (next === last) {
    next = deaths[Math.floor(Math.random() * deaths.length)]
  }
  return next
}

function setEventRate (eventInterval, immediately) {
  clearInterval(setEventRate._handle)
  setEventRate._handle = setInterval(() => onEvent(), eventInterval)

  if (immediately)
    onEvent()
}

async function onEvent () {
  const animTime = 1500

  let tween
  let updating = false

  // sound
  _last = getDeath(_last)
  console.log(`vlc ${_last}`)
  const cp = execFile('open', [_last], err => err && console.error(err))
  setTimeout(() => {
    tween = new ColorTween(eventColour, normal)
      .easing('cubicOut')
      .start(animate)
      .onUpdate(onUpdate)
      .duration(animTime)
      // .onEnd(() => cp.kill())
  },500)
  // const cp = execFile('vlc', ['-h'])

  async function animate () {
    while (tween.update()) {
      await new Promise(res => setTimeout(res, 33))
    }
  }
  async function onUpdate (currentColour) {
    if (updating) return
    try {
      updating = true
      // console.log(`set to ${currentColour}`)
      // await setTo(currentColour)
      await Lifx.setColorBroadcast({ color: { css: currentColour + '' } })
      // await new Promise(res=>setTimeout(res, 200))
    } finally {
      updating = false
    }
  }

}
