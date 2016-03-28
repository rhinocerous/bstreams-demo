if (!sabio.services.public)
    sabio.services.public = {};

sabio.services.public.onLoginFormSubmit = function (myData, onSuccess, onError) {
    var url = "/Api/Public/Login";
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
};

sabio.services.public.onRegistrationFormSubmit = function (myData, onSuccess, onError) {
    var url = "/Api/Public/Register";
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
};

sabio.services.public.onLogout = function (onSuccess, onError) {
    var url = "/api/public/logout";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};