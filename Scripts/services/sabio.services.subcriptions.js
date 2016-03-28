if (!sabio.services.subscriptions)
    sabio.services.subscriptions = {};

//CREATE
sabio.services.subscriptions.createSubscription = function (myData, onSuccess, onError) {
    var url = "/Api/Subscriptions/Insert";
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: JSON.stringify(myData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

//SELECT (GET) one subscription
sabio.services.subscriptions.getSubscriptionById = function (subscriptionId, onSuccess, onError) {
    var url = "/Api/Subscriptions/" + subscriptionId;
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

//UPDATE
sabio.services.subscriptions.updateSubscription = function (subscriptionId, myData, onSuccess, onError) {
    var url = "/Api/Subscriptions/" + subscriptionId;
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: JSON.stringify(myData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);

}

//INDEX
sabio.services.subscriptions.allSubscriptions = function (onSuccess, onError) {
    var url = "/Api/Subscriptions/";
    var settings = {
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: null,
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "GET"
    };
    $.ajax(url, settings);
};

//SELECT (GET) one subscription by a User Id
sabio.services.subscriptions.getSubscriptionByUserId = function (userId, onSuccess, onError) {
    var url = "/Api/Subscriptions/User/" + userId;
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

//SELECT (GET) one subscription by a Team Id
sabio.services.subscriptions.getSubscriptionByTeamId = function (teamId, onSuccess, onError) {
    var url = "/Api/Subscriptions/Team/" + teamId;
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