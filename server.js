'use strict';

//https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md

// This??
//io.sockets.on('connection', function (socket) {
//    socket.on('message', function (data) {
//        socket.broadcast.emit('message', data);
//    });
//});

// https://www.webrtc-experiment.com/

// https://github.com/muaz-khan/WebRTC-Experiment/blob/2aefed4ea790b1b5f1cd9f088d849ef4047f4496/websocket-over-nodejs/server.js#L36


const https = require('https');
const http = require('http');
const fs = require('fs');

const WebSocket = require('ws');

const server = http.createServer({
  //cert: fs.readFileSync('../test/fixtures/certificate.pem'),
  //key: fs.readFileSync('../test/fixtures/key.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(msg) {
    console.log(msg);
  });
});


// Client
server.listen(function listening() {
  // If the `rejectUnauthorized` option is not `false`, the server certificate
  // is verified against a list of well-known CAs. An 'error' event is emitted
  // if verification fails.
  // The certificate used in this example is self-signed so `rejectUnauthorized`
  // is set to `false`.
  const ws = new WebSocket(`ws://localhost:${server.address().port}`, {
    rejectUnauthorized: false
  });

  ws.on('open', function open() {
    ws.send('All glory to WebSockets!');
  });
});
