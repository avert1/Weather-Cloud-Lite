const ws281x = require('rpi-ws281x-native');
const rainbowPattern = require('./Animations/rainbow.js');
const fadePattern = require('./Animations/fade.js');
const weatherService = require('../App/Services/weather-service.js');



const NUM_LEDS = 32;
let currentLightProcess;
let currentWeatherData;

let rainbow = new rainbowPattern.rainbow();
let fade = new fadePattern.fade();

let lightProcessMap = {
  clear: fade,
  rainy: fade
}

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
  ws281x.reset();
  console.log('weathername: ' + weatherName);
  console.log((weatherName in lightProcessMap));
  if(!(weatherName in lightProcessMap)) {
    console.log("key " + weatherName + " not found in lightProcessMap!");
    currentLightProcess = lightProcessMap.clear;
  } else {
    currentLightProcess = lightProcessMap[weatherName];
  }
  currentLightProcess.printName();
}
