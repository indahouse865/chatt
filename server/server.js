const path = require("path");
const express = require('express');
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000;
const PublicPath = path.join(__dirname, "../public");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(PublicPath));

io.on("connection", (socket) => {
    console.log("New user connected");
    
    socket.emit('newMessageEvent', {
        from: "david@test.com",
        text: "Hey, whats up!?",
        createdAt: 123
    });

    socket.on('createMessage', (newEmail) => {
        console.log('createMessage', newEmail);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
