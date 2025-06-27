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
    socket.on("join", (userName) => {
        users.add(userName);
        socket.userName = userName; // store the user's name in the socket object

        // broadcast to all users that a new user has joined
        io.emit("userJoined", userName);

        // send the updated user list to all connected clients
        io.emit("userList", Array.from(users));
    });

    // incoming chat messages
    socket.on("chatMessage", ({userName, text}) => {
        // broadcast the message to all users
        io.emit("chatMessage", {userName, text});
    });

    // user disconnections
    socket.on("disconnect", () => {
        console.log("A user disconnected");

        // remove the user from the set
        users.forEach((user) => {
            if (user === socket.userName) {
                users.delete(user);
                io.emit("userLeft", user);
                io.emit("userList", Array.from(users));
            }
        });

        // send the updated user list to all connected clients
        io.emit("userList", Array.from(users));
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});