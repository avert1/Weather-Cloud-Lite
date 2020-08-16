const express = require("express");

const App = express();

App.use(express.static(__dirname + '/public'));

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/index.html');
});

//Get weather data every 5 minutes


module.exports = App;
