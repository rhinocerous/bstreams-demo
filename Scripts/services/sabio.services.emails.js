if (!sabio.services.emails)
    sabio.services.emails = {};

sabio.services.emails.run = function (onSuccess, onError) {
    var url = "/api/emails/run";
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