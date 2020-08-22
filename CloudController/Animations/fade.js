const ws281x = require('rpi-ws281x-native');
const helpers = require('./helpers.js');
const LEDStripAnim = require('./LEDStripAnim.js');

class fade extends LEDStripAnim {
  constructor() {
    super();
    this.increasing = true;
    this.brightnessOffset = 0;
    this.animName = "Fade";
  }

  run() {
    for (let i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = helpers.rgb2Int(0,0,0);
    }
    ws281x.render(pixelData);

    this.interval = setInterval(function () {
      if(this.increasing) {
        offset = (offset + 1) % 256;
      }
      else {
        this.brightnessOffset -=1;
        if(this.brightnessOffset <= 0) {
          this.increasing = true;
          this.brightnessOffset = 0;
        }
      }
      ws281x.setBrightness(this.brightnessOffset);
     }, 1000 / 30);
   }
}

module.exports.fade = fade;
