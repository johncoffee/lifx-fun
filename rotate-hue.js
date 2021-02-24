// Create a LifxLan object
const Lifx  = require('node-lifx-lan');

rotateHue()

async function rotateHue() {
  let incr = 0.00025
  let h = Math.random()
  while(h < 1) {
    await Lifx.setColorBroadcast({
      color: {
        hue: h,
        saturation: .8,
        brightness: .85,
      }
    })
    await new Promise(res => setTimeout(res, 20))
    h += incr

    if (h >= 1) {
      h = 0
    }
  }
}


