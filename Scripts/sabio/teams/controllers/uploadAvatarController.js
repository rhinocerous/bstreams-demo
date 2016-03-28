//**angular services go here:
//media Service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$mediaService', mediaServiceFactory);

    mediaServiceFactory.$inject = ['$baseService', '$sabio'];

    function mediaServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.media;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    };
})();

//notification service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$notificationsService', notificationsServiceFactory);

    notificationsServiceFactory.$inject = ['$baseService', '$sabio'];

    function notificationsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.notifications;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();

//teams service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$teamsService", teamsServiceFactory);

    teamsServiceFactory.$inject = ["$baseService", "$sabio"];

    function teamsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.teams;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();

//**controller:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('uploadAvatarController', UploadAvatarController);

    UploadAvatarController.$inject = ['$scope',
        '$baseController',
        '$routeParams',
        '$mediaService',
        '$teamsService',
        '$notificationsService',
        '$location'];

    function UploadAvatarController(
        $scope,
        $baseController,
        $routeParams,
        $mediaService,
        $teamsService,
        $notificationsService,
        $location) {

        var vm = this;
        vm.$scope = $scope;
        vm.$mediaService = $mediaService;
        vm.$teamsService = $teamsService;
        vm.$notificationsService = $notificationsService;
        vm.$location = $location;
        vm.$teamsId = $routeParams.teamsId;

        vm.displayMedia = null;
        vm.mediaForm = null;
        vm.myDropzone;
        vm.mediaId;
        vm.mediaFullUrl;
        vm.mediaDescription;
        vm.mediaMsg;

        vm.submitTeamsMedia = _submitTeamsMedia;

        vm.successTeamsSelectMediaByTeamsId = _successTeamsSelectMediaByTeamsId;
        vm.errorTeamsSelectMediaByTeamsId = _errorTeamsSelectMediaByTeamsId;
        vm.successSubmitTeamsMedia = _successSubmitTeamsMedia;
        vm.errorSubmitTeamsMedia = _errorSubmitTeamsMedia;
        vm.loadMediaSuccess = _loadMediaSuccess;

        $baseController.merge(vm, $baseController);
        vm.notify = vm.$mediaService.getNotifier($scope);

        //load image if user has uploaded one:
        render();

        function render() {
            console.log("teamsId from uploadAvatar page:", vm.$teamsId);
            vm.$teamsService.onTeamsSelectMediaByTeamsId(vm.loadMediaSuccess, vm.errorTeamsSelectMediaByTeamsId, vm.$teamsId);
            console.log(vm.$location);
        }

        //checks to see if media exists:
        function _loadMediaSuccess(data) {
            vm.notify(function () {
                console.log(data.item);
                if (data.item.mediaFileName == null) {
                    vm.mediaFullUrl = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";
                    vm.mediaDescription = "No image found";
                    vm.mediaMsg = "No image uploaded.";
                } else {
                    vm.mediaFullUrl = data.item.mediaFullUrl;
                    vm.mediaDescription = data.item.mediaTitle;
                    vm.mediaMsg = "";
                }
            });
        }

        //DropzoneNg code below: For reference: https://gist.github.com/compact/8118670#file-dropzone-directive-js-L26  (files involved: dropzoneNg.js + sabio.module.js)
        vm.myDropzone = {
            'options': {
                // passed into the Dropzone constructor
                'url': '/api/media/create/4/0',
                'autoProcessQueue': false,
                'parallelUploads': 1,
                'maxFiles': 1
            },
            'eventHandlers': {
                'addedfile': function () {
                    var dzMessageElement = angular.element('.dz-message');
                    dzMessageElement.hide();
                },
                'sending': function (file, xhr, formData) {
                },
                'success': function (file, response) {
                    console.log(response);
                    vm.mediaId = response.item;

                    //update mediaId for teams by teamsID:
                    vm.$teamsService.onTeamsUpdateMediaId(vm.successSubmitTeamsMedia, vm.errorSubmitTeamsMedia, vm.$teamsId, vm.mediaId);

                    vm.myDropzone.removeAllFiles();

                    var dzMessageElement = angular.element('.dz-message');
                    dzMessageElement.show();
                },
                'error': function (file, errorMessage) {
                    console.log("Something went wrong. Please refresh and try again.", errorMessage);
                },
                'maxfilesexceeded': function (file, response) {
                    console.log("Limit 1 media file.", response);
                }
            }
        }

        //submit photo after its been uploaded by dropzone:
        function _submitTeamsMedia() {
            vm.myDropzone.processQueue();   //queue is processed here, since we set 'autoProcessQueue' to 'false'
        };

        //----success&error handlers for submitting media via dropzone:
        function _successSubmitTeamsMedia(data, status, settings) {
            vm.$notificationsService.success("Successfully submitted an Image.");
            vm.$teamsService.onTeamsSelectMediaByTeamsId(vm.successTeamsSelectMediaByTeamsId, vm.errorTeamsSelectMediaByTeamsId, vm.$teamsId);
        }

        function _errorSubmitTeamsMedia(jqXhr, error) {
            vm.$notificationsService.error("Error in submitting the Image. " + error);
        };


        //----success&error handlers for grabbing photo:
        function _successTeamsSelectMediaByTeamsId(data) {
            vm.notify(function () {
                console.log("success handler for teamSelectMediaByTeamsId", data.item);
                vm.mediaFullUrl = data.item.mediaFullUrl;
                vm.mediaDescription = data.item.mediaTitle;
                vm.mediaMsg = "";
            });
        };

        function _errorTeamsSelectMediaByTeamsId(jqXhr, error) {
            vm.$notificationsService.error("Error in loading the Image. " + error);
            console.log("no bueno", error);
        };

    }
})();
