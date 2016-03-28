if (!sabio.services.teams) {
    sabio.services.teams = {};
}

sabio.services.teams.onTeamsInsert = function (onSuccess, onError, myData) {
    var url = "/api/teams";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsUpdate = function (onSuccess, onError, teamsId, myData) {
    var url = "/api/teams/" + teamsId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsSelectByTeamsId = function (onSuccess, onError, teamsId) {
    var url = "/api/teams/" + teamsId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsSelectAll = function (onSuccess, onError) {
    var url = "/api/teams/index";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onUsersTeamsSelectUsersByTeamsId = function (onSuccess, onError, teamsId) {
    var url = "/api/teams/users/" + teamsId;
    var settings = {
        context: this
        , cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsUpdateMediaId = function (onSuccess, onError, teamsId, mediaId) {
    var url = "/api/teams/media/";
    var myData = {
        teamsId: teamsId,
        mediaId: mediaId
    }
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsSelectMediaByTeamsId = function (onSuccess, onError, teamsId) {
    var url = "/api/teams/media/" + teamsId;
    var settings = {
        context: this
        , cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.selectByBucketId = function (bucketId, onSuccess, onError) {
    var url = "/api/teams/bucket/" + bucketId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsSelectTeamsParents = function (bucketId, onSuccess, onError) {
    var url = "/api/teams/teamsParents/" + bucketId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onTeamsSelectTeamsDivisions = function (teamsId, onSuccess, onError) {
    var url = "/api/teams/teamsDivisions/" + teamsId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}

sabio.services.teams.onAddUserInsertUsersTeams = function (data, onSuccess, onError) {
    var url = "/api/teams/users/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: data
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
}

sabio.services.teams.selectBySubscriptionType = function(onSuccess, onError, subscriptionType) {
    var url = "/api/teams/subscriptionType/" + subscriptionType;
    var settings = {
        context: this
        , cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}