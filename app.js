/**
 * AUTHOR: JOHN BATCHELOR
 * WEBSITE: john-batchelor.com
 */


const express = require("express");
const socket = require("socket.io");


const app = express();
const server = app.listen(8080);

app.use("/", express.static(__dirname));

var io = socket(server);
io.sockets.on('connection', newConnection);
var messages = [];

//Runs when new user connects.
function newConnection(socket)
{
    console.log(socket.id);

    //push any previous messages out
    io.sockets.emit("messages", messages);

    //when a new message is recieved
    socket.on("message", function(data){
        console.log(data); //for debugging purposes
        messages.push(data); //add new message to messages array.
        io.sockets.emit("messages", messages); //send messages array to client.
    });

    socket.on("clear", function(data){
        messages = []; //clear all messages.
    });
}
