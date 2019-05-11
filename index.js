var express = require('express');
var http = require('http');
var WebSocket = require('ws');
var responseHandler = require('./logic/handler');
var moment = require('moment');
moment().format();



// ****************************************
// ****** mongoDB and mongoose setup ******
// ****************************************

var mongoose = require('mongoose'); //Import the mongoose module
var mongoDB_address = 'mongodb://localhost:27017/chezmoi'; //Set up default mongoose connection

mongoose.connect(mongoDB_address).then(response => {
    console.log('>>>>> Mongoose connection successful.');
});


mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library
var db = mongoose.connection; //Get the default connection


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// ****************************************
// ******         app setup          ******
// ****************************************


const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({
    server
});

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        responseHandler.handleResponse(message, res => {

            const data = JSON.stringify(res);
            wss.clients.forEach(ws => {
                ws.send(data);
            })

        },
            err => {
                console.log("ERROR", err);
            });
    });


    ws.send(JSON.stringify({
        command: 'connected'
    }));


});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});