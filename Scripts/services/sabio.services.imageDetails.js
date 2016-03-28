if (!sabio.services.imageDetails)
    sabio.services.imageDetails = {};

sabio.services.imageDetails.selectById = function (onSuccess, onError, id) {
    var url = "/api/imageDetails/selectById/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.imageDetails.upsert = function (onSuccess, onError, myData, id) {
    var url = "/api/imageDetails/upsert/" + id;                                             
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
}
