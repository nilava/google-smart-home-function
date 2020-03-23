const functions = require('firebase-functions');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
//port = 8000
//app.listen(port)

/////Handle Execute or Query
app.post('/smarthome', function (request, response) {
  intent = request.body.inputs[0].intent;
  // response.writeHead(200, {'Content-Type': 'application/json'})
  if (intent === 'action.devices.SYNC') {
    var Sync = require('./devicesync');
    Sync.handleSync(request.body, response);
  }
  else if (intent === 'action.devices.QUERY') {
    var Query = require('./devicequery');
    Query.handleQuery(request.body, response);
  }
  else if (intent === 'action.devices.EXECUTE') {
    var Execute = require('./deviceexecute');
    Execute.handleExecute(request.body, response);
  }
})

var failsafe = setInterval(function () {
  console.log('failsafe run')
  process.exit(0);
  clearInterval(failsafe);
}, 6000);

exports.smarthome = functions.https.onRequest(app);
