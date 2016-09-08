function connected() {
    testAPI();
}

function notConnected() {
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
    FB.api('/me/friends?fields=name,picture', function(response) {
        var html = "";
        for (var i in response.data) {
            html += '<span class="person">' +
                response.data[i].name.split(' ')[0] +
                '<img src="' + response.data[i].picture.data.url + '" /> ' +
                '</span>';
        }
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
        //showFriends();

        if (response.paging == undefined)
            showFriends();
        else
            loadFriends(response.paging.cursors.after);

    });
}

function showFriends() {
    var html = "";
    console.log(friendsToInvite.length);
    for (var i in friendsToInvite) {
        html += '<a href="#" onclick=\'invite("' + friendsToInvite[i].name + '", "' + friendsToInvite[i].id + '")\' class="person">' +
            friendsToInvite[i].name.split(' ')[0] +
            '<img src="' + friendsToInvite[i].picture.data.url + '" /> ' +
            '</a>';
    }
    document.getElementById('friendsToInvite').innerHTML = html;
}

function invite(friend_name, friend_id) {
    FB.ui({
        method: 'apprequests',
        message: 'Hey! Want to meet up today?',
        to: friend_id
    },
    function(){
        //document.getElementById('inviteMsg').innerHTML = friend_name + ' invited';
    });
}

function share() {
    FB.ui({
        method: 'send',
        link: 'http://petr-devaikin.github.io/otto/img/b.jpg',
    });
}
