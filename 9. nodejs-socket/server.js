const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// initialize socket.io and attach it to the http server
// This allows socket.io to listen for incoming connections on the same server
const io = socketIo(server);

// serve static files from the 'public' directory
app.use(express.static('public'));

const users = new Set();

io.on("connection", (socket) => {
    console.log("A user connected");

    // handle user joining

    // incoming chat messages

    // user disconnections
});