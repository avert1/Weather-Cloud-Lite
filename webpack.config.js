const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './App/Routes/index.js',
  output: {
    path: __dirname + '/App/public/js',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin ({
      filename: 'index.html', //Name of the file to be created
      template: './App/Views/index.html',
      minify: false
    })
  ],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
  }
}
