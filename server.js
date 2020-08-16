const App = require('./App/app.js')


let port = process.env.PORT || 3000;
App.listen(port, ()=> {
  console.log('listening on port ' + port);
});
