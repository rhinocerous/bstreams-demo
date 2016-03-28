if (!sabio.services.news)
    sabio.services.news = {};

sabio.services.news.addArticle = function (myData, OnSuccess, OnError) {
    var url = "/api/news/createArticle";

    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: myData
        , dataType: "json"
        , success: OnSuccess
        , error: OnError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.news.loadArticle = function (newsId, onSuccess, onError) {
    var url = "/api/news/" + newsId;

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

sabio.services.news.editArticle = function (newsId, myData, onSuccess, onError) {
    var url = "/api/news/" + newsId;

    console.log("my data", myData);

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

sabio.services.news.selectAll = function (onSuccess, onError) {
    var url = "/api/news/index";

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

sabio.services.news.updateMedia = function (myData, onSuccess, onError) {
    var url = "/api/news/media";

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

sabio.services.news.updateMediaHighlight = function (myData, onSuccess, onError) {
    var url = "/api/news/media";

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

sabio.services.news.updateMediaCopy = function (myData, onSuccess, onError) {
    var url = "/api/news/media";

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