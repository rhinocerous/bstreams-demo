if (!sabio.services.media)
    sabio.services.media = {};



//--------------------"UPDATE" AJAX CALL (MediaBS):
sabio.services.media.updateBS = function (mediaId, myData, onSuccess, onError) {

    var url = "/api/media/edit/" + mediaId;
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
}

//--------------------"UPDATEPARENTID" AJAX CALL --Currently being used to append dropzone media files to the right spot (updated to MEDIABS):
sabio.services.media.updateParentId = function (id, parentId, onSuccess, onError) {

    var url = "/api/media/parent";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: { //this data is being sent to the apiController where it'll get bound with the 'MediaParentRequest' model. 
            //make sure the names match up! 'MediaId' + 'MediaParentId'
            MediaId: id,
            MediaParentId: parentId
        }
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
}

//get all folders and files from specific folder (MEDIABS):
sabio.services.media.SelectMediasByPid = function (pid, onSuccess, onError) {
    var url = "/Api/Media/SelectMediasByPid/" + pid;
    var settings = {
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "GET"
    };
    $.ajax(url, settings);
};

//--------------------"SELECTBYID" AJAX CALL:
sabio.services.media.selectById = function (mediaId, onSuccess, onError) {
    var url = "/api/media/SelectMediaById/" + mediaId;
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


//--------------------"DELETE" AJAX CALL (MediaBS):
sabio.services.media.deleteMediaById = function (id, onSuccess, onError) {

    var url = "/api/media/delete/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
}

//------------------"GETALL" AJAX CALL:
sabio.services.media.getAll = function (onSuccess, onError) {
    var url = "/api/media/list";
    //var myData = $("#mediaForm").serialize(); //No data is being pulled from the form--we don't need this!
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null //setting to 'null' because we got rid of 'myData' as we're getting data from the db and not sending it to the db
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}

//------------------"GETALL_BYMEDIATYPE" AJAX CALL:
sabio.services.media.getAllByMediaType = function (mediaType, onSuccess, onError) {

    var url = "/api/media/listByMediaType/" + mediaType ;
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

//-------Get multiple by media ids
sabio.services.media.getMultipleByIds = function (ids, onSuccess, onError) {
    var url = "/api/media/GetMultipleMediaById";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: ids
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
        
    };
    $.ajax(url, settings);
}


//------------------"CREATE" AJAX CALL:
//***This ajax call is no longer being used. Dropzone is running its own ajax call!
sabio.services.media.create = function (mediaType, onSuccess, onError, myData) {

    var url = "/api/media/create/" + mediaType; //URL should be all lowercase, but its not case-sensitive
    // var myData = $("#mediaForm").serialize(); // Would need to "serialize" the form and send it in as the 4th parameter if you wanted to use this call!
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: myData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
}

sabio.services.media.onMediaSelectAllByAspNetUsersId = function (onSuccess, onError) {
    // var url = "/api/media/selectAllUsersMedia";
    var url = "/api/usersfolders/selectAllUsersMedia";
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
}

sabio.services.media.onMediaUpdateAspNetUsersId = function (onSuccess, onError, mediaId, parentId) {
    // var url = "/api/media/addUsersMedia";
    var url = "/api/usersfolders/addUsersMedia";
    var myData = {
        id: mediaId,
        parentId: parentId
    }
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
}

sabio.services.media.onMediaUpdateAspNetUsersIdDelete = function (onSuccess, onError, mediaId, parentId) {
    // var url = "/api/media/deleteUsersMedia";
    var url = "/api/usersfolders/deleteUsersMedia";
    var myData = {
        id: mediaId,
        parentId: parentId
    }
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
}

//--insert Tags to Media by MediaId:
sabio.services.media.insertTagsByMediaId = function (myData, onSuccess, onError) {
    var url = "/api/media/insertTagsByMediaId";
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