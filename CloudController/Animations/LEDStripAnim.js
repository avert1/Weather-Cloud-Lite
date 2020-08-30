const ws281x = require('rpi-ws281x-native');

class LEDStripAnim {

  constructor(numLeds) {
    this.interval = null;
    this.pixelData = new Uint32Array(numLeds);
    this.numLeds = numLeds;
    /*this.emptyPixelArray = new Uint32Array(numLeds);
    for (let i = 0; i < this.numLeds; i++) {
      emptyPixelArray[i] = helpers.rgb2Int(0,0,0));
    }*/

  }

  printName() {
    console.log(this.animName);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    ws281x.reset();
  }


}

module.exports = LEDStripAnim;
