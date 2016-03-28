if (!sabio.services.migration)
    sabio.services.migration = {};

sabio.services.migration.bulkUpsertMockData = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertMockData/";
    var settings = {
        cache: false
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpsertMediasTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertMediasTable/";
    var settings = {
        cache: false
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpsertMediasBSTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertMediasBSTable/";
    var settings = {
        cache: false
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpsertTeamsTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertTeamsTable/";
    var settings = {
        cache: false
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpsertUsersTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertUsersTable/";
    var settings = {
        cache: false
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpdateUsersTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpdateUsersTable/";
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

sabio.services.migration.bulkUpsertAspNetUsersTable = function (myData, onSuccess, onError) {
    var url = "/Api/Public/Register";
    var settings = {
        cache: false
        //, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpsertFoldersTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertFoldersTable/";
    var settings = {
        cache: false
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.migration.bulkUpsertSubscriptionsTable = function (myData, onSuccess, onError) {
    var url = "/Api/Migrations/BulkUpsertSubscriptionsTable/";
    var settings = {
        cache: false
        , contentType: " application/json; charset=utf-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};
