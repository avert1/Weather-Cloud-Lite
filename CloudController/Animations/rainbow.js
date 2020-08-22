const ws281x = require('rpi-ws281x-native');
const helpers = require('./helpers.js');
const LEDStripAnim = require('./LEDStripAnim.js');


class rainbow extends LEDStripAnim {
  constructor(numLeds = 32) {
    super(numLeds);
    this.animName = "Rainbow";
  }


  run() {
    let offset = 0;
    this.interval = setInterval(() => {
      for (let i = 0; i < this.numLeds; i++) {
        this.pixelData[i] = this.colorwheel((offset + i) % 256);
      }

      offset = (offset + 1) % 256;
      ws281x.render(this.pixelData);
     }, 1000 / 30);
   }

   colorwheel(pos) {
     pos = 255 - pos;
     if (pos < 85) { return helpers.rgb2Int(255 - pos * 3, 0, pos * 3); }
     else if (pos < 170) { pos -= 85; return helpers.rgb2Int(0, pos * 3, 255 - pos * 3); }
     else { pos -= 170; return helpers.rgb2Int(pos * 3, 255 - pos * 3, 0); }
   }
}

module.exports.rainbow = rainbow;
