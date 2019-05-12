var WebSocketServer = require('websocket').server;
var http = require('http');
const PORT = 8000;

var splixMsg = require('./splix.js');


var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(PORT, function () { 
    console.log(`Listening on port ${PORT}`);
    console.log(``)
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});
var clients = [];

class Client {
    constructor(connection) {
        this.connection = connection;
    }
}

// WebSocket server
wsServer.on('request', function (request) {
    
    var connection = request.accept(null, request.origin);
    var c = new Client(connection);
    clients.push(c);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        if (message.type === 'binary') {
            // process WebSocket message
            splixMsg(this, message, c);
        }
    });

    connection.on('close', function (connection) {
        // close user connection
    });
});

