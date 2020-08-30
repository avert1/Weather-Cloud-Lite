const ws281x = require('rpi-ws281x-native');
const helpers = require('./helpers.js');
const LEDStripAnim = require('./LEDStripAnim.js');


class lightning extends LEDStripAnim {
  constructor(numLeds = 32) {
    super(numLeds);
    this.animName = "Lightning";
  }


  run() {
    let offset = 0;
    this.interval = setInterval(() => {
      switch(helpers.randomInt(1,4)){
        case 1:
          //this.thunderburst();
          this.rolling();
          //delay(helpers.randomInt(10,500));
           console.log("Thunderburst");
          break;

        case 2:
          this.rolling();
          console.log("Rolling");
          break;

        default:
          //this.crack();
          this.rolling();
          //delay(random(50,250));
          console.log("Crack");
          break;
      }
    //random number between 1 - 5 seconds
    }, Math.random() * 5000 + 1000);
  }

  sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  //Lightning pattern methods, pulled from https://github.com/jamesabruce/cloudlamp/blob/master/thundercloud/thundercloud.ino
  async rolling() {
  // a simple method where we go through every LED with 1/10 chance
  // of being turned on, up to 10 times, with a random delay wbetween each time
    this.ws281x.setBrightness(220);
    for(let i=0; i < helpers.randomInt(2,10); i++){
      for(let j=0; j < this.numLeds; j++){
        if(helpers.randomInt(0,10)> 8){
        this.pixelData[j] = helpers.rgb2Int( 0, 0, 255);

        } else{
          //dont need reset as we're blacking out other LEDs her
          this.pixelData[j] = helpers.rgb2Int(0,0,0);
        }
      }
      this.ws281x.render(this.pixelData);
      await this.sleep(helpers.randomInt(5,100));
    }
    this.ws281x.setBrightness(0);
  }

  crack() {
     //turn everything white briefly
     for(let i=0; i < this.numLeds; i++) {
        this.pixelData[i] = helpers.rgb2Int( 0, 0, 255);
     }
     this.ws281x.render(this.pixelData);
     this.reset();
  }
/*
  thunderburst() {

    // this thunder works by lighting two random lengths
    // of the strand from 10-20 pixels.
    int rs1 = random(0, this.numLeds/2);
    int rl1 = random(10,20);
    int rs2 = random(rs1+rl1, this.numLeds);
    int rl2 = random(10,20);

    //repeat this chosen strands a few times, adds a bit of realism
    for(int r = 0; r < random(3,6); r++){

      for(int i = 0; i < rl1; i++){
        leds[i+rs1] = helpers.rgb2Int( 0, 0, 255);
      }

      if(rs2+rl2 < this.numLeds){
        for(int i=0;i < rl2; i++){
          this.pixelData[i+rs2] = helpers.rgb2Int( 0, 0, 255);
        }
      }

      ws281x.render(this.pixelData);
      //stay illuminated for a set time
      delay(random(10,50));

      this.reset();
      delay(random(10,50));
    }

  }*/
}

module.exports.lightning = lightning;
