const jq = jQuery;
let socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm:ss a");
    let template = jq('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jq('#ordered').append(html);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm:ss a");
    let template = jq('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    console.log(message);
    console.log(html)
    jq('#ordered').append(html);
});


jQuery('#msg-form').on('submit', function (e) {
    e.preventDefault();
    let messageTextBox = jq('[name="message"]'); 
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val("");
    });
});

let geoBtn = jq("button#send-location");
geoBtn.on('click', function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    geoBtn.attr('disabled', 'disabled').text("Sending Location...");

    navigator.geolocation.getCurrentPosition(function(position) {
        geoBtn.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        geoBtn.removeAttr('disabled').text("Send Location");
        alert('Unable to fetch location');
    });
});
