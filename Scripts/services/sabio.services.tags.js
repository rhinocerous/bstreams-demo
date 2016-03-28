if (!sabio.services.tags)
    sabio.services.tags = {};

sabio.services.tags.selectAll = function (onSuccess, onError) {
    var url = "/api/tags/selectAll";                                              
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

sabio.services.tags.selectById = function (onSuccess, onError, id) {
    var url = "/api/tags/selectById/" + id;
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

sabio.services.tags.selectByIdPlusDescendants = function (onSuccess, onError, id) {
    var url = "/api/tags/selectByIdPlusDescendants/" + id;
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

sabio.services.tags.selectByMultipleIdsPlusDescendants = function (onSuccess, onError, myData) {
    var url = "/api/tags/selectByMultipleIdsPlusDescendants/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , data: {selectedCategories:myData}
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.tags.insert = function (onSuccess, onError, myData) {
    var url = "/api/tags/";                                             
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: JSON.stringify(myData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
}

sabio.services.tags.update = function (onSuccess, onError, myData, id) {
    var url = "/api/tags/" + id;                                                
    var settings = {
        cache: false
        , contentType: "application/json"
        , data: JSON.stringify(myData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
}

sabio.services.tags.selectByParentId = function (onSuccess, onError, parentId) {
    var url = "/api/tags/selectByParentId/" + parentId;
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

sabio.services.tags.selectByParentIdPlusChildren = function (onSuccess, onError, parentId) {
    var url = "/api/tags/selectByParentIdPlusChildren/" + parentId;
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

sabio.services.tags.deleteByIdPlusDescendants = function (onSuccess, onError, id) {
    var url = "/api/tags/deleteByIdPlusDescendants/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}

sabio.services.tags.selectImageBankMainCategories = function (onSuccess, onError) {
    var url = "/api/tags/imageBankMainCategories";
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

sabio.services.tags.selectBySlugPlusChildren = function (onSuccess, onError, slug) {
    var url = "/api/tags/selectBySlug/" + slug;
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