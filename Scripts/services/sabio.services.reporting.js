if (!sabio.services.reporting)
    sabio.services.reporting = {};

sabio.services.reporting.run = function (onSuccess, onError) {
    var url = "/api/reporting/run";                                              
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