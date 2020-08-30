const ws281x = require('rpi-ws281x-native');
const rainbowPattern = require('./Animations/rainbow.js');
const fadePattern = require('./Animations/fade.js');
const lightningPattern = require('./Animations/lightning.js');
const weatherService = require('../App/Services/weather-service.js');


class LEDStripController {
  constructor() {
    this.currentLightProcess = null;
    this.currentWeatherData = {
      summary: "testSumary"
    };
    this.NUM_LEDS = 32;

    //Anim class init. Maybe change this to function style
    let rainbow = new rainbowPattern.rainbow(this.NUM_LEDS);
    let fade = new fadePattern.fade(this.NUM_LEDS);
    let lightning = new lightningPattern.lightning(this.NUM_LEDS);

    this.lightProcessMap = {
      "clear-day": fade,
      "clear-night": fade,
      "partly-cloudy-day": fade,
      "partly-cloudy-night": fade,
      "snow": fade,
      "sleet": fade,
      "wind": fade,
      "fog": fade,
      "thunderstorm": lightning, //Not an actual value currently
      "rain": lightning,
    }

    ws281x.init(this.NUM_LEDS);
    this.updateLightProcess("rain");

    //Get weather
    setInterval(() => {
      weatherService.getCurrentWeather().then(locInfo => {
        this.currentWeatherData = locInfo;
        this.updateLightProcess(this.currentWeatherData.icon);
      })
    }, 5 * 60 * 1000)
  }

  updateLightProcess(weatherName) {
    console.log("Here!");
    if(this.currentLightProcess != null) {
      this.currentLightProcess.stop();
    }
    if(!(weatherName in this.lightProcessMap)) {
      console.log("key " + weatherName + " not found in lightProcessMap!");
      weatherName = "clear-day";
    }

    this.currentLightProcess = this.lightProcessMap[weatherName];

    this.currentLightProcess.printName();
    this.currentLightProcess.run();
  }

  resetStrip() {
    ws281x.reset();
  }

  getCurrentWeatherData() {
    return JSON.stringify(this.currentWeatherData);
  }
}

module.exports = LEDStripController;

process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

let stripController = new LEDStripController();
