if (!sabio.services.roles)
    sabio.services.roles = {};

sabio.services.roles.loadRoles = function (onSuccess, onError) {
    var url = "/api/roles";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
};

sabio.services.roles.onAddRoleFormSubmit = function (myData, onSuccess, onError) {
    var url = "/Api/Roles/Create";
    console.log("data sent to the server: " + myData);
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

sabio.services.roles.getRoleData = function (id, onSuccess, onError) {
    var url = "/Api/Roles/Get/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
};

sabio.services.roles.onEditFormSubmit = function (myData, onSuccess, onError) {
    var url = "/Api/Roles/Edit";
    console.log("data sent to the server: " + myData);
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
};