'use strict';
const fetch = require('node-fetch');
const key = require('../../key.json');

function getCurrentWeather() {
  let locInfo = {
    city: "Dallas",
    state: "Texas",
    lat: 32.9596, //Addison latitude
    lng: -96.83, //Addison Longitude
  }
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b35d6865f8de0d15839bbbbeba4b09f4/${locInfo.lat},${locInfo.lng}`)
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
