// Create a LifxLan object
const Lifx = require('node-lifx-lan')

rotateHue()

async function rotateHue () {
  let incr = 0.00025
  let delay = 20
  let h = Math.random()

  while (h < 1) {
    await Lifx.setColorBroadcast({
      color:
        {
          hue: h,
          saturation: 1,
          brightness: 0.3,
        }
    })
    await new Promise(res => setTimeout(res, delay))
    h += incr

    if (h > 1) {
      h = 0
    }
  }
}


