const path = require("path");
const express = require('express');
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000;
const PublicPath = path.join(__dirname, "../public");

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(PublicPath));

io.on("connection", (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and room name are both required");
        }
        socket.join(params.room);
        //socket.leave(params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined server`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on("disconnect", () => {

    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
