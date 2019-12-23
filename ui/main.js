//https://github.com/muaz-khan/WebRTC-Experiment/tree/master/text-chat

connection.openSignalingChannel = function (callback) {
    var websocket = new WebSocket('ws://domain:protocol/');

    // data from "onmessage" must be passed over "callback" object
    websocket.onmessage = function (e) {
        callback(e.data);
    };

    // socket object must be returned for reusability
    return websocket;
};



// global stuff
var onMessageCallbacks = {};
var currentUserUUID = Math.round(Math.random() * 60535) + 5000;
var websocket = new WebSocket('ws://localhost:8888/');

websocket.onmessage =  function(e) {
    data = JSON.parse(e.data);

    if(data.sender == currentUserUUID) return;

    if (onMessageCallbacks[data.channel]) {
        onMessageCallbacks[data.channel](data.message);
    };
};

websocket.push = websocket.send;
websocket.send = function(data) {
    data.sender = currentUserUUID;
    websocket.push(JSON.stringify(data));
};

// overriding "openSignalingChannel" method
connection.openSignalingChannel = function (config) {
    var channel = config.channel || this.channel;
    onMessageCallbacks[channel] = config.onmessage;

    if (config.onopen) setTimeout(config.onopen, 1000);

    // directly returning socket object using "return" statement
    return {
        send: function (message) {
            websocket.send(JSON.stringify({
                sender: currentUserUUID,
                channel: channel,
                message: message
            }));
        },
        channel: channel
    };
};
