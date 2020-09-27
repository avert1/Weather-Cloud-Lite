const ws281x = require('rpi-ws281x-native');
const helpers = require('./helpers.js');

class LEDStripAnim {

  constructor(numLeds) {
    this.interval = null;
    this.timeout = null;
    this.pixelData = new Uint32Array(numLeds);
    this.numLeds = numLeds;
    this.ws281x = ws281x;
    /*this.emptyPixelArray = new Uint32Array(numLeds);
    for (let i = 0; i < this.numLeds; i++) {
      emptyPixelArray[i] = helpers.rgb2Int(0,0,0));
    }*/

  }

  printName() {
    console.log(this.animName);
  }

  stop() {
    if(this.interval != null) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if(this.timeout != null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  reset() {
    this.ws281x.reset();
  }

  clear() {
    for(let i=0; i < this.numLeds; i++) {
       this.pixelData[i] = helpers.rgb2Int( 0, 0, 0);
    }
  }


}

module.exports = LEDStripAnim;
