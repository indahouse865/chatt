const jq = jQuery;
let socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

//14:00 on jquery vid
socket.on('newMessage', function (message) {
    console.log('New Message', message);
    let li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery('#ordered').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log('New Location Message', message);
    let li = jq("<li></li>");
    let a = jq("<a target='_blank'>My Current Location</a>");
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jq('#ordered').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'hi!'
// }, function(data) {
//     console.log("got it! " + data);
// });

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
