if (!sabio.services.help)
    sabio.services.help = {};

sabio.services.help.loadRecord = function (faqId, onSuccess, onError) {
    var url = "/Api/Help/" + faqId;

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

sabio.services.help.editFaq = function (faqId, myData, onSuccess, onError) {
    var url = "/Api/Help/" + sabio.page.faqId;

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

sabio.services.help.addFaq = function (myData, OnSuccess, OnError) {
    var url = "/Api/Help/CreateFaq";
    //var myData = $("#inputForm").serialize();

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

sabio.services.help.selectAll = function (onSuccess, onError) {
    var url = "/Api/Help/Index";

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

sabio.services.help.updateMedia = function (myData, onSuccess, onError) {
    var url = "/Api/Help/Media";
    
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


