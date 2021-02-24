// Create a LifxLan object
const Lifx  = require('node-lifx-lan');

const red = '#4cabd7'

setTo(red)

async function setTo(css) {
  // await Lifx.turnOnBroadcast()
  await Lifx.setColorBroadcast({
    color: { css }
  })
  Lifx.destroy()
}