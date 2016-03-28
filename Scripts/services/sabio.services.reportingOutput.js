if (!sabio.services.reportingOutput)
    sabio.services.reportingOutput = {};

sabio.services.reportingOutput.selectByDateReportingUserTime = function (onSuccess, onError, date) {
    var url = "/api/reportingOutput/selectByDateReportingUserTime";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.reportingOutput.selectByDateAndUserIdAndRangeReportingUserTime = function (onSuccess, onError, date, userId, range) {
    var url = "/api/reportingOutput/selectByDateAndUserIdAndRangeReportingUserTime/" + userId + "/" + range;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.reportingOutput.selectAllUniqueControllerAndActionByLayerSource = function (onSuccess, onError, layerSource) {
    var url = "/api/reportingOutput/selectAllUniqueControllerAndActionByLayerSource/" + layerSource;
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

sabio.services.reportingOutput.selectAllUniqueControllerAndActionByDateAndUserIdAndRangeReportingUserControllerAndActionTime = function (onSuccess, onError, date, userId, range) {
    var url = "/api/reportingOutput/selectAllUniqueControllerAndActionByDateAndUserIdAndRangeReportingUserControllerAndActionTime/" + userId + "/" + range;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.reportingOutput.selectByDateAndUserIdAndRangeReportingUserControllerAndActionTime = function (onSuccess, onError, date, userId, range) {
    var url = "/api/reportingOutput/selectByDateAndUserIdAndRangeReportingUserControllerAndActionTime/" + userId + "/" + range;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.reportingOutput.selectByDateAndTeamIdAndRangeReportingTeamTime = function (onSuccess, onError, date, teamId, range) {
    var url = "/api/reportingOutput/selectByDateAndTeamIdAndRangeReportingTeamTime/" + teamId + "/" + range;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.reportingOutput.selectAllUniqueControllerAndActionByDateAndTeamIdAndRangeReportingTeamControllerAndActionTime = function (onSuccess, onError, date, teamId, range) {
    var url = "/api/reportingOutput/selectAllUniqueControllerAndActionByDateAndTeamIdAndRangeReportingTeamControllerAndActionTime/" + teamId + "/" + range;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.reportingOutput.selectByDateAndTeamIdAndRangeReportingTeamControllerAndActionTime = function (onSuccess, onError, date, teamId, range) {
    var url = "/api/reportingOutput/selectByDateAndTeamIdAndRangeReportingTeamControllerAndActionTime/" + teamId + "/" + range;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: { Date: date }
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}