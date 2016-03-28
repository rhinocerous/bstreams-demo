if (!sabio.services.folders)
	sabio.services.folders = {};

	//insert new folder into folderBS--updated
    sabio.services.folders.insert = function (data, onSuccess, onError) {
        var url = "/Api/Folders/InsertFolder";
        var settings = {
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            dataType: "json",
            success: onSuccess,
            error: onError,
            type: "POST"
            };
        $.ajax(url, settings);          
    };

    //edit existing folder in folderBS db table--updated
    sabio.services.folders.update = function (id, data, onSuccess, onError) {
        var url = "/Api/Folders/UpdateFolder/" + id;
        var settings = {
        	cache: false,
        	contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        	data: data,
        	dataType: "json",
        	success: onSuccess,
        	error: onError,
        	type: "PUT"
        };
        $.ajax(url, settings);
    };

    //get folders/files by ID (from foldersBS) --used for the treeNg (wasn't able to refactor the 'selectById' ajax call)
    sabio.services.folders.selectFoldersBsById = function (id, onSuccess, onError) {
        var url = "/Api/Folders/SelectFolderBsById/" + id;
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

    //get all folders and files from specific folder
    sabio.services.folders.selectFoldersByPid = function (pid, onSuccess, onError) {
        var url = "/Api/Folders/SelectFoldersByPid/" + pid;
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

    //updated to get folders + desc from foldersBS
    sabio.services.folders.getByIdPlusDescendants = function (id, onSuccess, onError) {
        var url = "/Api/Folders/SelectFolderByIdPlusDescendants/" + id;
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

    //send in fId and get COUNT of folders + medias with that fId as its parentId OR Id:
    sabio.services.folders.countFolderAndMediaByFid = function (folderId, onSuccess, onError) {
        var url = "/Api/Folders/CountFolderAndMediaByFid/" + folderId;
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

    //get all medias (recursively) by folderId:
    sabio.services.folders.selectMediasByFolderId = function (folderId, onSuccess, onError) {
        var url = "/Api/Folders/SelectMediasByFolderId/" + folderId;
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

    //delete folder(s) by updating parentId = -1 in foldersBS
    sabio.services.folders.deleteByIdPlusDescendants = function (folderId, onSuccess, onError) {
        var url = "/Api/Folders/DeleteFolderByIdPlusDescendants/" + folderId;
        var settings = {
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            success: onSuccess,
            error: onError,
            type: "DELETE"
        };
        $.ajax(url, settings);
    };

    //delete mediaBS by FolderBS Id (updates parentId = -1):
    sabio.services.folders.deleteMediaByFolderId = function (folderId, onSuccess, onError) {
        var url = "/Api/Folders/DeleteMediaByFolderId/" + folderId;
        var settings = {
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            success: onSuccess,
            error: onError,
            type: "DELETE"
        };
        $.ajax(url, settings);
    };

    //updated stored proc on the service layer to get from foldersBS + mediaBS
    sabio.services.folders.selectByParentFolderId = function (parentFolderId, onSuccess, onError) {
        var url = "/Api/Folders/SelectByParentFolderId/" + parentFolderId;
        var settings = {
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            //data: data,
            dataType: "json",
            success: onSuccess,
            error: onError,
            type: "GET"
        };
        $.ajax(url, settings);
    };

//-----did not make any changes to the ajax calls below:

    // update folder name + slug by id
    sabio.services.folders.updateFolderName = function (id, data, onSuccess, onError) {
    	var url = "/Api/Folders/UpdateFolderName/" + id;
    	var settings = {
    		cache: false,
    		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    		data: data,
    		dataType: "json",
    		success: onSuccess, 
    		error: onError,
    		type: "PUT"
    	};
    	$.ajax(url, settings);
    };

    //get folder by id
    sabio.services.folders.selectById = function (id, onSuccess, onError) {
        var url = "/Api/Folders/SelectFolderById/" + id;
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

    // update parent folder id by id 
    sabio.services.folders.updateParentFolderId = function (id, data, onSuccess, onError) {
    	var url = "/Api/Folders/UpdateParentFolderId/" + id;
    	var settings = {
    		cache: false,
    		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    		data: data,
    		dataType: "json",
    		success: onSuccess,
    		error: onError,
    		type: "PUT"
    	};
    	$.ajax(url, settings);
    };

    //get all folders in folders db table
    sabio.services.folders.selectAll = function (onSuccess, onError) {
    	var url = "/Api/Folders/SelectAllFolders";
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

    //sabio.services.folders.downloadFolderById = function (folderId, onSuccess, onError) {  -- DUPE? -- line 287
    //    var url = "/Api/Folders/download/" + folderId;
    //    var settings = {
    //        cache: false,
    //        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    //        dataType: "json",
    //        success: onSuccess,
    //        error: onError,
    //        type: "GET"
    //    };
    //    $.ajax(url, settings);
    //}


//User Folders ajax calls:

    sabio.services.folders.onFoldersInsertAspNetUsersId = function (onSuccess, onError, myData) {
        // var url = "/Api/Folders/insertUsersFolders";
        var url = "/api/usersfolders/insertUsersFolders";
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

    sabio.services.folders.onFoldersSelectAllByAspNetUsersId = function (onSuccess, onError) {
        // var url = "/Api/Folders/selectAllUsersFolders";
        var url = "/api/usersfolders/selectAllUsersFolders";
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

    sabio.services.folders.onFoldersUpdateFolderNameByUser = function (onSuccess, onError, myData) {
        // var url = "/Api/Folders/updateFolderNameByUser";
        var url = "/api/usersfolders/updateFolderNameByUser";
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

    sabio.services.folders.onFoldersUpdateFolderIdByUser = function (onSuccess, onError, myData) {
        // var url = "/Api/Folders/updateFolderIdByUser";
        var url = "/api/usersfolders/updateFolderIdByUser";
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

    sabio.services.folders.downloadFolderById = function (folderId, onSuccess, onError) {
        var url = "/Api/Folders/download/" + folderId;
        var settings = {
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: folderId,
            dataType: "json",
            success: onSuccess,
            error: onError,
            type: "GET"
        };
        $.ajax(url, settings);
    }

    sabio.services.folders.downloadMediasById = function (mediaIds, onSuccess, onError) {
        var url = "/Api/Folders/downloadMediaZip";
        var settings = {
            cache: false
            , contentType: "application/json"
            , data: JSON.stringify(mediaIds)
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    }
    