if (!sabio.services.rightsTypes)
    sabio.services.rightsTypes = {};

sabio.services.rightsTypes.loadRights = function (userId, onSuccess, onError) {
    var url = "/api/userbucket/rights/" + userId;

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
};

sabio.services.rightsTypes.addRights = function (myData, onSuccess, onError) {
    var url = "/api/userbucket/addRights" ;

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
    
