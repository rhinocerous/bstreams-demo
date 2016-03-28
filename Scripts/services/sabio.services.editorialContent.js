if(!sabio.services.editorialCotent)
sabio.services.editorialContent = {};

//insert editorial content
sabio.services.editorialContent.insert = function(data, onSuccess, onError){
	var url = "/Api/EditorialContent/Insert";
	var settings = {
		cache: false
		, contentType: "application/json"
		, data: JSON.stringify(data)
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "POST"
	};
	$.ajax(url, settings);
}

//insert editorial content media
sabio.services.editorialContent.insertMedia = function (data, onSuccess, onError) {
    var url = "/Api/EditorialContent/InsertMedia";
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: data
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "POST"
    };
    $.ajax(url, settings);
}

//insert editorial content linking
sabio.services.editorialContent.insertLinking = function (data, onSuccess, onError) {
    var url = "/Api/EditorialContent/InsertLinking";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: data
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
}

//update editorial content linking
sabio.services.editorialContent.updateLinking = function (data, onSuccess, onError) {
    var url = "/Api/EditorialContent/updateLinking";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: data
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
}

//get editorial content by editorialId
sabio.services.editorialContent.get = function(editorialId, onSuccess, onError) {
	var url = "/Api/EditorialContent/Get/" + editorialId;
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

//get editorial content linking by editorialContentId
sabio.services.editorialContent.getLinking = function (editorialContentId, onSuccess, onError) {
    var url = "/Api/EditorialContent/GetContentLinking/" + editorialContentId;
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

//update editorial content
sabio.services.editorialContent.update = function (data, id, onSuccess, onError) {
	var url = "/Api/EditorialContent/Update/" + id;
	var settings = {
		cache: false
		, contentType: "application/json"
		, data: JSON.stringify(data)
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "PUT"
	};
	$.ajax(url, settings);
}

//update sort order
sabio.services.editorialContent.updateSortOrder = function (ids, onSuccess, onError) {
    var url = "/Api/EditorialContent/UpdateSortOrder";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: ids
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , traditional: true
        , type: "PUT"
    };
    $.ajax(url, settings);
}

//update editorial content media
sabio.services.editorialContent.updateMedia = function (editorialContentId, data, onSuccess, onError) {
    var url = "/Api/EditorialContent/UpdateMedia/" + editorialContentId;
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: data
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "POST"
    };
    $.ajax(url, settings);
}

//delete editorial content
sabio.services.editorialContent.delete = function (id, onSuccess, onError) {
	var url = "/Api/EditorialContent/Delete/" + id;
	var settings = {
    cache: false
	, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
	, data: null
	, dataType: "json"
	, success: onSuccess
	, error: onError
	, type: "DELETE"
	};
	$.ajax(url, settings);
}

//delete list of ids - used for delete row function
sabio.services.editorialContent.deleteList = function (ids, onSuccess, onError) {
    var url = "/Api/EditorialContent/DeleteList";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: ids
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , traditional: true
        , type: "DELETE"
    };
    $.ajax(url, settings);
}

//delete editorial content media
sabio.services.editorialContent.deleteMedia = function (mediaId, onSuccess, onError) {
    var url = "/Api/EditorialContent/DeleteMedia/" + mediaId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}

//delete editorial content linking
sabio.services.editorialContent.deleteLinking = function (editorialContentId, onSuccess, onError) {
    var url = "/Api/EditorialContent/DeleteContentLinking/" + editorialContentId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
}
