const express = require("express");
const currentWeatherService = require("./Services/weather-service");
const LEDStripController = require("../CloudController/app.js");

const App = express();

let currentWeather;
let stripController = new LEDStripController();

App.use(express.static(__dirname + '/public'));

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/index.html');
});

App.get('/weatherdata', (req, res) => {
  res.send(stripController.getCurrentWeatherData());
});

module.exports = App;
