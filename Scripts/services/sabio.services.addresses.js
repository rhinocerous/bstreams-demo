if (!sabio.services.addresses)
    sabio.services.addresses = {};

sabio.services.addresses.selectAllAddress = function (onSuccess, onError) {
    var url = "/api/addresses/selectAllAddress/";
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

sabio.services.addresses.selectAddressById = function (onSuccess, onError, addressId) {
    var url = "/api/addresses/selectAddressById/" + addressId;
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

sabio.services.addresses.selectAllStateProvince = function (onSuccess, onError) {
    var url = "/api/addresses/selectAllStateProvince/";
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

sabio.services.addresses.insert = function (onSuccess, onError, myData) {
    var url = "/api/addresses/insert/";                                                
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

sabio.services.addresses.update = function (onSuccess, onError, myData, addressId) {
    var url = "/api/addresses/update/" + addressId;                                               
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

sabio.services.addresses.onAddressesUpdateByTeamsId = function (onSuccess, onError, myData) {
    var url = "/api/addresses/teams/";
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

sabio.services.addresses.onAddressesSelectByTeamsId = function (onSuccess, onError, teamsId) {
    var url = "/api/addresses/teams/" + teamsId;
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };

    $.ajax(url, settings);
}