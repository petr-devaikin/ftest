function connected() {
    testAPI();
}

function notConnected() {
    console.log('123123123');
    window.location = 'login.html';
}

//==================

var friendsToInvite = [];

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Hi ' + response.name + '!';
    });
    /*
    FB.api('/me/likes', function(response) {
        for (var i in response.data)
            console.log(response.data[i].name);
    });
*/
    FB.api('/me/friends', function(response) {
        var html = "";
        for (var i in response.data)
            html += response.data[i].name + '<br/>';
        document.getElementById('friends').innerHTML = html;
    });

    loadFriends();
}

var ii = 0;
function loadFriends(after) {
    var afterParam = (after === undefined) ? '' : ('&after=' + after);
    FB.api('/me/invitable_friends?limit=100'+afterParam, function(response) {
        for (var i in response.data)
            friendsToInvite.push(response.data[i]);
        if (response.paging == undefined)
            showFriends();
        else
            loadFriends(response.paging.cursors.after);
    });
}

function showFriends() {
    var html = "";
    console.log(friendsToInvite.length);
    for (var i in friendsToInvite)
        html += friendsToInvite[i].name + '<br/>';
    document.getElementById('friendsToInvite').innerHTML = html;
}
