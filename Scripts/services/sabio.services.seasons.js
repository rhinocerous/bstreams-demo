if (!sabio.services.seasons)
    sabio.services.seasons = {};

sabio.services.seasons.selectAll = function (onSuccess, onError) {
    var url = "/api/seasons/";
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

sabio.services.seasons.selectById = function (onSuccess, onError, seasonId) {
    var url = "/api/seasons/selectSeasonById/" + seasonId;
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

sabio.services.seasons.selectItemById = function (onSuccess, onError, itemId) {
    var url = "/api/seasons/selectSeasonItemById/" + itemId;
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


sabio.services.seasons.insert = function (onSuccess, onError, myData) {
    var url = "/api/seasons/";
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

sabio.services.seasons.itemsInsert = function (onSuccess, onError, myData, seasonId) {
    var url = "/api/seasons/itemsInsert/" + seasonId;
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

sabio.services.seasons.update = function (onSuccess, onError, myData, seasonId) {
    var url = "/api/seasons/" + seasonId;                                               
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

sabio.services.seasons.itemsUpdate= function (onSuccess, onError, myData, itemId) {
    var url = "/api/seasons/itemsUpdate/" + itemId;
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

sabio.services.seasons.deleteSeason = function (onSuccess, onError, seasonId) {
    var url = "/api/seasons/delete/" + seasonId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}

sabio.services.seasons.deleteSeasonItem = function (onSuccess, onError, itemId) {
    var url = "/api/seasons/itemsDelete/" + itemId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}