if (!sabio.services.users)
    sabio.services.users = {};

sabio.services.users.loadUsers = function (onSuccess, onError) {
    var url = "/api/users";
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

sabio.services.users.loadAllRoles = function (onSuccess, onError) {
    var url = "/Api/Roles";
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

sabio.services.users.getUserRoles = function (id, onSuccess, onError) {
    var url = "/Api/Roles/GetUserRoles/" + id;
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

sabio.services.users.insertUserRole = function (userId, roleId, onSuccess, onError) {
    var url = "/Api/Roles/InsertUserRole/" + userId + "/" + roleId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.users.deleteUserRole = function (userId, roleId, onSuccess, onError) {
    var url = "/Api/Roles/DeleteUserRole/" + userId + "/" + roleId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
};

sabio.services.users.getUserData = function (id, onSuccess, onError) {
    var url = "/Api/Users/Get/" + id;
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

sabio.services.users.getUserDataPlusTeamsId = function (id, onSuccess, onError) {
    var url = "/Api/Users/GetPlusTeamsId/" + id;
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

sabio.services.users.onEditFormSubmit = function (userId, myData, onSuccess, onError) {
    var url = "/Api/Users/Edit/" + userId;
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

sabio.services.users.getMediaByUserId = function (id, onSuccess, onError) {
    var url = "/Api/Users/GetMedia/" + id;
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

sabio.services.users.updateUserMedia = function (userId, mediaId, onSuccess, onError) {
    var url = "/Api/Users/EditUserMedia/" + userId + "/" + mediaId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
};

sabio.services.users.onUsersProfileSelectByUserID = function (onSuccess, onError) {
    var url = "/api/users/profile";
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

sabio.services.users.onUsersProfileUpdate = function (onSuccess, onError, myData) {
    var url = "/api/users/profile/current";
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

sabio.services.users.onUsersProfileUpdatePassword = function (onSuccess, onError, myData) {
    var url = "/api/users/profile/currentpassword";
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

/*
sabio.services.users.getUsersByParams = function (userOrTeam, myData, onSuccess, onError) {
    //userOrTeam boolean true=users, false=teams
    var url = "";
    if (userOrTeam) 
        url = "/Api/Users/GetByParams/"; 
    else 
        url = "/Api/Users/GetByParams2/";

    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: myData
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};
*/

sabio.services.users.getUsersByParams = function (myData, onSuccess, onError) {
    var url = "/Api/Users/GetByParams/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: myData
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.users.getUsersByParamsRange = function (myData, onSuccess, onError) {
    var url = "/Api/Users/GetByParamsRange/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: myData
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.users.getDetailsById = function (userId, onSuccess, onError) {
    var url = "/api/users/details/" + userId;
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

sabio.services.users.getCurrentUser = function (onSuccess, onError) {
    var url = "/api/users/profile/currentUserDetails";
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