if (!sabio.services.editorials)
    sabio.services.editorials = {};

//SELECT (GET) one editorial
sabio.services.editorials.loadRecord = function (editorialId, onSuccess, onError) {
    var url = "/Api/Editorial/" + editorialId;
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

sabio.services.editorials.search = function (params, onSuccess, onError) {
    var url = "/Api/Editorial/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: params
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    }
    $.ajax(url, settings);
};

//INDEX of all editorials
sabio.services.editorials.allEditorials = function (onSuccess, onError) {
    var url = "/Api/Editorial/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    }
    $.ajax(url, settings);
};

//CREATE editorial
sabio.services.editorials.createEditorial = function (myData, onSuccess, onError) {
    var url = "/Api/Editorial/CreateEditorial";
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

//UPDATE editorial
sabio.services.editorials.updateEditorial = function (editorialId, myData, onSuccess, onError) {
    var url = "/Api/Editorial/" + editorialId;
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

//DELETE editorial
sabio.services.editorials.deleteEditorial = function (editorialId, onSuccess, onError) {
    var url = "/Api/Editorial/DeleteEditorial/" + editorialId;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}

//DUPLICATE editorial
sabio.services.editorials.duplicateEditorial = function (myData, onSuccess, onError) {
    var url = "/Api/Editorial/DuplicateEditorial/"; //+ editorialId;
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

sabio.services.editorials.addLinking = function (editorialId, mediaId, onSuccess, onError) {
    var url = "/Api/Editorial/AddLinking/" + editorialId + "/" + mediaId;
    var settings = {
        cache: false
        //, contentType: "application/json"
        //, data: JSON.stringify(myData)
        //, dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.editorials.deleteLinking = function (editorialId, mediaId, onSuccess, onError) {
    var url = "/Api/Editorial/DeleteLinking/" + editorialId + "/" + mediaId;
    var settings = {
        cache: false
        //, contentType: "application/json"
        //, data: JSON.stringify(myData)
        //, dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
};

sabio.services.editorials.getLinkingByEid = function (editorialId, onSuccess, onError) {
    var url = "/Api/Editorial/GetLinkingByEid/" + editorialId;
    var settings = {
        cache: false
        //, contentType: "application/json"
        //, data: JSON.stringify(myData)
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
};

sabio.services.editorials.updateAllLinking = function (editorialId, myData, onSuccess, onError) {
    var url = "/Api/Editorial/UpdateAllLinking/" + editorialId;
    var settings = {
        cache: false
        , contentType: " application/json; charset=utf-8"
        , data: JSON.stringify(myData)
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};
