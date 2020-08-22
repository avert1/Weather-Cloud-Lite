class LEDStripAnim {

  constructor(numLeds) {
    this.interval = null;
    this.pixelData = new Uint32Array(numLeds);
    this.numLeds = numLeds;

  }

  printName() {
    console.log(this.animName);
  }

  stop() {
    clearInterval(this.interval);
  }


}

module.exports = LEDStripAnim;
