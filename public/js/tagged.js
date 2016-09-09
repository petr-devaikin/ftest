function connected() {
    testAPI();
}

function notConnected() {
    window.location = 'login.html';
}

//==================

var events = [];

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Hi ' + response.name + '!';
    });

    FB.api('/me/tagged_places?limit=100&fields=created_time,place{category,name}', function(response) {
        var html = "";
        for (var i in response.data)
            html += '<div class="event">' +
                response.data[i].place.name +
                '<div class="eventCategory">' + response.data[i].place.category + '</div>' +
                '<div class="eventPlace">Visited ' + response.data[i].created_time.substr(0, 10) + '</div>' +
                '</div>';
        document.getElementById('places').innerHTML = html;
    });
}
