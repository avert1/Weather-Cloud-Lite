import React from 'react';
import ReactDOM from 'react-dom';
const fetch = require('node-fetch');
//import currentWeatherService from '../Services/weather-service.js';


//currentWeatherService.getCurrentWeather(true).then( weatherData => {
fetch('/weatherData')
.then(response=>response.json())
.then(weatherData => {
  console.log(weatherData);
  ReactDOM.render(
    (<div>hello {weatherData.summary}</div>),
    document.getElementById('root')
  );
});
