if (!sabio.services.userBuckets) 
    sabio.services.userBuckets = {};

sabio.services.userBuckets.selectAll = function (onSuccess, onError) {
    var url = "/Api/UserBucket/Index";

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

sabio.services.userBuckets.loadRecord = function (bucketId, onSuccess, onError) {
    var url = "/Api/UserBucket/" + bucketId;

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

sabio.services.userBuckets.editTeam = function (bucketId, myData, onSuccess, onError) {
    var url = "/Api/UserBucket/" + bucketId;
   
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


sabio.services.userBuckets.addTeam = function (myData, OnSuccess, OnError) {
    var url = "/Api/UserBucket/AddTeam";
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