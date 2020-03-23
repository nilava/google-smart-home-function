module.exports = {
  handleQuery: function (request, response) {
    const request2 = require('request');
    requestid = request.requestId;
    device = request.inputs[0].payload.devices;
    devicetotal = Object.keys(device).length
    devices = {};
    i = 0;
    j = 0;
    while (i < devicetotal) {
      const id = device = request.inputs[0].payload.devices[i].id;
      token = request.inputs[0].payload.devices[i].customData.key1;
      vkey = request.inputs[0].payload.devices[i].customData.key2;
      var url = 'https://www.ownlab.in/' + token + '/' + vkey;
      request2(url, function (error, response, body) {
        // console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('body:', body);
        devices[id] = { on: false, online: true };
        j++;
      });
      i++;
    }

    const payload = {
      requestId: requestid,
      payload: {
        devices: devices,
      }
    };


    var interval = setInterval(function () {
      if (j >= devicetotal) {
        response.json(payload);
        console.log(JSON.stringify(payload));
        clearInterval(interval);
      }
    }, 1000);



  }
};





