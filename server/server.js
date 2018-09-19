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

    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome to the app'
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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
