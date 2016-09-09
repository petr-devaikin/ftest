function connected() {
    testAPI();
}

function notConnected() {
    window.location = 'login.html';
}

//==================

var events = [];

function testAPI() {
    var html = "";
    var list = yelpData.businesses;
    for (var i in list) {
        var type = "";
        for (var j in list[i].categories)
            type
        html += '<div class="event">' +
            list[i].name +
            '<div class="eventCategory">' + list[i].categories.map(function (a) { return a[0]; }).join(', ') + '</div>' +
            '<div class="eventPlace">' + list[i].location.display_address.join('<br/>') + '</div>' +
            '</div>';
    }
    document.getElementById('places').innerHTML = html;
}
