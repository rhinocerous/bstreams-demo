//User Avatar Controller
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('userProfileAvatarController', userProfileAvatarController);

    userProfileAvatarController.$inject = ['$scope', '$baseController', '$usersService', '$mediaService','$notificationsService', '$routeParams', '$location'];

    function userProfileAvatarController(
        $scope
        , $baseController
        , $usersService
        , $mediaService
        , $notificationsService
        , $routeParams
        , $location) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$usersService = $usersService;
        vm.$mediaService = $mediaService;
        vm.$notificationsService = $notificationsService;
        vm.$routeParams = $routeParams;
        vm.$location = $location;

    }
})();

////Need to angularize this!!

//sabio.page.startUp = function () {

//    //console.log("abc");
//    sabio.services.users.getMediaByUserId($("#userId").val(), sabio.page.getMediaByUserIdAjaxSuccess, sabio.page.ajaxError);
//    //DROPZONE CODE:

//    Dropzone.options.mediaForm = {

//        //---configurations section:
//        autoProcessQueue: true,
//        parallelUploads: 1,                //limit of how many files can upload at once
//        maxFiles: 4,                       //how many files dropzone can handle

//        //---events section:
//        init: function () { //"init" function is called when dropzone is initialized
//            var myDropzone = this;

//            myDropzone.on("processing", function (file) {
//                myDropzone.options.url = "/api/media/create/1/0";

//            });


//            myDropzone.on("addedfile", function () {
//                console.log("After you've chosen your image, hit 'Submit' and we'll save that image for you.");
//            });
//            myDropzone.on("success", function (files, response) {
//                console.log("Successfully saved your file!");
//                console.log(response.item);
//                sabio.services.media.selectById(response.item, sabio.page.mediaSelectByIdAjaxSuccess, sabio.page.ajaxError);
//                sabio.services.users.updateUserMedia($("#userId").val(), response.item, sabio.page.updateUserMediaAjaxSuccess, sabio.page.ajaxError);
//            });
//            myDropzone.on("error", function (files, errorMessage) {
//                console.log("Something went wrong. Please refresh and try again.")
//            });
//            myDropzone.on("maxfilesexceeded", function (files, response) {
//                console.log("TOO MANY FILES! Limit 1 media file.");
//            });
//        }
//    } //end of dropzone.options.dzMedia

//}; //end of sabio.page.startUp();-----------------------------------

//sabio.page.getMediaByUserIdAjaxSuccess = function (data, status, settings) {
//    if (data.item != null) {
//        console.log("getMediaAjaxSuccess ajax success: " + data.item.mediaId);
//        console.log(data.item.mediaFullUrl);
//        sabio.page.doThisIfMediaExists(data);
//    }
//    else {
//        console.log("data.item is null");
//    }
//};

//sabio.page.updateUserMediaAjaxSuccess = function (data, status, settings) {
//    console.log("updateUserMediaAjaxSuccess ajax success");
//};

//sabio.page.doThisIfMediaExists = function (data) {
//    console.log("sabio.page.doThisIfMediaExists");
//    $("#pictureIcon").addClass("hidden");
//    $("#uploadedPictureMessage").html("This is the picture you currently have on file. If you want to change it, please use the uploader on the left.");
//    $("#uploadedPicture").attr("src", data.item.mediaFullUrl);
//    $("#avatar-pic").attr("src", data.item.mediaFullUrl);
//};

//sabio.page.mediaSelectByIdAjaxSuccess = function (data, status, settings) {
//    console.log("mediaSelectByIdAjaxSuccess ajax success");
//    sabio.page.doThisIfMediaExists(data);
//};

//sabio.page.ajaxError = function (jqXHR, textStatus, errorThrown) {
//    console.log("ajax call failed: " + jqXHR + " " + textStatus + " " + errorThrown);
//};

