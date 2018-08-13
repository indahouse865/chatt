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
    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
