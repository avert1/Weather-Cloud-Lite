'use strict';
const fetch = require('node-fetch');
const key = require('../../key.json');

function getCurrentWeather(useProxy = false) {
  let locInfo = {
    city: "Dallas",
    state: "Texas",
    lat: 32.9596, //Addison latitude
    lng: -96.83, //Addison Longitude
  }

  let fetchUrl = `https://api.darksky.net/forecast/${key.key}/${locInfo.lat},${locInfo.lng}`;
  let fetchProxy = 'https://cors-anywhere.herokuapp.com/';
  return fetch((useProxy? fetchProxy + fetchUrl : fetchUrl))
  .then(response=>response.json())
  .then(resJson=>{
    console.log(resJson);
    locInfo.currentData = resJson.currently;
    locInfo.summary = resJson.currently.summary;
    locInfo.icon = resJson.currently.icon;
    locInfo.temperature = resJson.currently.temperature;
    return locInfo;
  })
}

module.exports.getCurrentWeather = getCurrentWeather;
