if (!sabio.services.mainMenu)
    sabio.services.mainMenu = {};

sabio.services.mainMenu.GetAllTagsFoldersUserBuckets = function (onSuccess, onError) {
    var url = "/api/public/totalindex";

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