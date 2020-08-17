const express = require("express");
const currentWeatherService = require("./Services/weather-service");

const App = express();

let currentWeather;

App.use(express.static(__dirname + '/public'));

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/index.html');
});

/*
//Get weather data every 5 minutes. Move to other service.
currentWeatherService.getCurrentWeather().then(res => res.json())
.then(resJson => {
  currentWeather =
})
*/
module.exports = App;
