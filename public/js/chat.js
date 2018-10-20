const jq = jQuery;
let socket = io();


function scrollToBottom () {

    let messages = jq('#messages');
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function () {
    let params = jq.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No error");
        }
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on('updateUserList', function (users) {
    let ol = jq('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jq('<li></li>').text(user));
    });

    jq('#users').html(ol);
});

socket.on('updateUserList', function (users) {
    console.log('Users list', users);
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm:ss a");
    let template = jq('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jq('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm:ss a");
    let template = jq('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jq('#messages').append(html);
    scrollToBottom();
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
