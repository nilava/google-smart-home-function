module.exports = {
  handleSync: function (request, response) {
    requestid = request.requestId;
    var resp = response;
    const request1 = require('request');
    var url = 'https://smarthome-discovery.herokuapp.com/google.php';
    request1(url, function (error, response, body) {
      //  console.log('error:', error); // Print the error if one occurred
      //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //  console.log('body:', body), // Print the HTML for the Google homepage.
      returnpayload(request, resp, body);
    });


    function returnpayload(request, response, body) {
      var body = JSON.parse(body);
      response.json({ requestId: requestid, payload: body });
    }
  }
};


