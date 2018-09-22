const path = require("path");
const express = require('express');
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000;
const PublicPath = path.join(__dirname, "../public");

const {generateMessage} = require('./utils/message');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(PublicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined server'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("this is from server");
    });

    //     socket.broadcast.emit('newMessage', {
    //         from: message.from,
    //         text: message.text,
    //         createdAt: new Date().getTime()
    //     });
    // });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
