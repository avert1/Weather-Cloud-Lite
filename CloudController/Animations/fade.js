const ws281x = require('rpi-ws281x-native');
const helpers = require('./helpers.js');
const LEDStripAnim = require('./LEDStripAnim.js');

class fade extends LEDStripAnim {
  constructor(numLeds = 32) {
    super(numLeds);
    this.increasing = true;
    this.brightnessOffset = 0;
    this.animName = "Fade";
  }

  run() {
    for (let i = 0; i < this.numLeds; i++) {
      this.pixelData[i] = helpers.rgb2Int(255,255,255);
    }
    ws281x.setBrightness(0);
    ws281x.render(this.pixelData);

    this.interval = setInterval(() => {
      if(this.increasing) {
        this.brightnessOffset += 1;
        if(this.brightnessOffset >= 220) {
          this.increasing = false;
          this.brightnessOffset = 220;
        }
      }
      else {
        this.brightnessOffset -=1;
        if(this.brightnessOffset <= 1) {
          this.increasing = true;
          this.brightnessOffset = 1;
        }
      }
      ws281x.setBrightness(this.brightnessOffset);
    }, 1000 / 80);
   }
}

module.exports.fade = fade;
