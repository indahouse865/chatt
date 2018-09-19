let socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

    socket.emit('createMessage', {
        from: "David or liz!",
        text: "I like smiling at my phone"
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on('newMessageEvent', function (message) {
    console.log('New Message Event', email);
});
