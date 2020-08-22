const ws281x = require('rpi-ws281x-native');
const rainbowPattern = require('./Animations/rainbow.js');
const fadePattern = require('./Animations/fade.js');
const weatherService = require('../App/Services/weather-service.js');



const NUM_LEDS = 32;
let currentLightProcess;
let currentWeatherData;

let rainbow = new rainbowPattern.rainbow(NUM_LEDS);
let fade = new fadePattern.fade(NUM_LEDS);

let lightProcessMap = {
  clear: fade,
  rainy: fade
}

ws281x.init(NUM_LEDS);

process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});
updateLightProcess("test");

//Get weather
setInterval(function(){
  weatherService.getCurrentWeather().then(locInfo => {
    currentWeatherData = locInfo;
    updateLightProcess(currentWeatherData.summary);
  })
}, 5 * 60 * 1000)

function updateLightProcess(weatherName){
  if(currentLightProcess != null) {
    currentLightProcess.stop();
  }
  if(!(weatherName in lightProcessMap)) {
    console.log("key " + weatherName + " not found in lightProcessMap!");
    currentLightProcess = lightProcessMap.clear;
  } else {
    currentLightProcess = lightProcessMap[weatherName];
  }
  currentLightProcess.printName();
  currentLightProcess.run();
}
