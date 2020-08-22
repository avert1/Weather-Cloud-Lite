import React from 'react';
import ReactDOM from 'react-dom';
import currentWeatherService from '../Services/weather-service.js';


currentWeatherService.getCurrentWeather(true).then( weatherData => {
  console.log(weatherData);
  ReactDOM.render(
    (<div>hello {weatherData.summary}</div>),
    document.getElementById('root')
  );
});
