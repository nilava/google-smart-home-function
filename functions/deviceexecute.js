module.exports = {
    handleExecute: function (request, response) {
        requestid = request.requestId;
        device = request.inputs[0].payload.commands[0].devices;
        devicetotal = Object.keys(device).length;
        state = request.inputs[0].payload.commands[0].execution[0].params.on;
        commands = [];
        const payload = {
            requestId: requestid,
            payload: {
                commands: commands,
            }
        };
        i = 0;

        while (i < devicetotal) {
            id = device[i].id;
            token = device[i].customData.key1;
            vkey = device[i].customData.key2;
            apirequest(token, vkey);
            commands.push({
                ids: [id], "status": "SUCCESS", "states": {
                    "on": state,
                    "online": true
                }
            });

            i++;

        }

        response.json(payload)
        console.log(JSON.stringify(payload));

        function apirequest(token, vkey) {
            console.log(token, vkey);
            const request2 = require('request');
            var url = 'https://ownlab.in/' + token + '/' + vkey;
            request2(url, function (error, response, body) {
                // console.log('error:', error); 
                // console.log('statusCode:', response && response.statusCode); 
                // console.log('body:', body); 
            });
        }

    }
};


