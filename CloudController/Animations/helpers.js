function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

function randomInt (min, max) {
  return Math.floor(Math.random()*(max-min) + min);
}

module.exports.rgb2Int = rgb2Int;
module.exports.randomInt = randomInt;
