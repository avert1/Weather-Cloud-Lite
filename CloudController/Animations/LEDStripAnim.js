class LEDStripAnim {

  constructor() {
    this.interval = null;
  }

  printName() {
    console.log(this.animName);
  }

  stop() {
    clearInterval(this.interval);
  }


}

module.exports = LEDStripAnim;
