//**angular services go here:

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

//userBucket service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$userBucketService", userBucketServiceFactory);

    userBucketServiceFactory.$inject = ["$baseService", "$sabio"];

    function userBucketServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.userBuckets;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();

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


//**controller:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('basicInfoController', BasicInfoController);

    BasicInfoController.$inject = ['$scope', '$baseController', '$routeParams', '$teamsService', '$userBucketService', '$mediaService', '$notificationsService', '$location'];

    function BasicInfoController(
        $scope,
        $baseController,
        $routeParams,
        $teamsService,
        $userBucketService,
        $mediaService,
        $notificationsService,
        $location) {

        var vm = this;
        vm.$scope = $scope;
        vm.$teamsService = $teamsService;
        vm.$userBucketService = $userBucketService;
        vm.$mediaService = $mediaService;
        vm.$notificationsService = $notificationsService;
        vm.$location = $location;
        vm.$teamsId = $routeParams.teamsId;

        console.log($routeParams.teamsId);

        vm.mediaItems = null;
        vm.teams = null;
        vm.teamsForm = null;
        vm.bucketOptions = null;
        vm.showTeamsErrors = false;
        vm.displayMedia = null;
        vm.mediaForm = null;
        vm.mediaFullUrl = null;
        vm.mediaDescription = null;

        vm.submitTeamsInformation = _submitTeamsInformation;
        vm.takeUserToUpload = _takeUserToUpload;

        vm.successTeamsUpdate = _successTeamsUpdate;
        vm.errorTeamsUpdate = _errorTeamsUpdate;
        vm.successTeamsSelectByTeamsId = _successTeamsSelectByTeamsId
        vm.errorTeamsSelectByTeamsId = _errorTeamsSelectByTeamsId;
        vm.successTeamsSelectMediaByTeamsId = _successTeamsSelectMediaByTeamsId;
        vm.errorTeamsSelectMediaByTeamsId = _errorTeamsSelectMediaByTeamsId;
        vm.successUserBucketSelectAll = _successUserBucketSelectAll;
        vm.errorUserBucketSelectAll = _errorUserBucketSelectAll;


        $baseController.merge(vm, $baseController);
        vm.notify = vm.$teamsService.getNotifier($scope);
        vm.notify = vm.$mediaService.getNotifier($scope);


        //render user bucket options, grab the team by teamsId and the media by teamsId:
        render();

        function render() {
            console.log(vm.$teamsId + " from the basicInfo Controller");

            if (vm.$teamsId) {
                vm.$userBucketService.selectAll(vm.successUserBucketSelectAll, vm.errorUserBucketSelectAll);
                vm.$teamsService.onTeamsSelectByTeamsId(vm.successTeamsSelectByTeamsId, vm.errorTeamsSelectByTeamsId, vm.$teamsId);
                vm.$teamsService.onTeamsSelectMediaByTeamsId(vm.successTeamsSelectMediaByTeamsId, vm.errorTeamsSelectMediaByTeamsId, vm.$teamsId);
            }
            else {
                //saftey net,though i dont think this else will ever have to run...
                console.log("Did not find TeamsId--will be taking you to the create page!");
                setTimeout(function () {
                    vm.notify(function () {
                        vm.$location.url('teams/createTeam');
                    }, 5000);
                });
            }
        }//end of render();

        //success&error handlers for getting user bucket options:
        function _successUserBucketSelectAll(data) {
            vm.notify(function () {
                vm.bucketOptions = data.items;
                console.log(vm.bucketOptions);
            });
        }
        function _errorUserBucketSelectAll(jqXhr, error) {
            vm.$notificationsService.error("Error in loading the User Bucket records. " + error);
        }

        //success&error handlers for getting team by teamId:
        function _successTeamsSelectByTeamsId(data) {
            vm.$notificationsService.success("Successfully loaded your Teams record", data);
            console.log(data.item);
            vm.teams = data.item;
        }

        function _errorTeamsSelectByTeamsId(jqXhr, error) {
            vm.$notificationsService.error("Error in loading the Teams record. " + error);
        }

        //success&error handlers for getting media by teamId
        function _successTeamsSelectMediaByTeamsId(data) {
            vm.notify(function () {

                if (data.item.mediaFileName == null) {
                    vm.mediaFullUrl = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";
                    vm.mediaDescription = "No image found";
                } else {
                    console.log(data.item);
                    vm.mediaItems = data.item;
                    vm.mediaFullUrl = vm.mediaItems.mediaFullUrl;
                    vm.mediaDescription = vm.mediaItems.mediaDescription;
                }
            });
        }

        function _errorTeamsSelectMediaByTeamsId(jqXhr, error) {
            vm.$notificationsService.error("Error in loading the Image. " + error);
        }


        //on ng-click, take user to uploadAvatar:
        function _takeUserToUpload() {
            setTimeout(function () {
                vm.notify(function () {
                    vm.$location.url('/teams/' + vm.$teamsId + '/uploadAvatar');
                }, 5000);
            });
        }


        //on ng-submit:
        function _submitTeamsInformation() {
            vm.showTeamsErrors = true;
            if (vm.teamsForm.$valid) {
                vm.$teamsService.onTeamsUpdate(vm.successTeamsUpdate, vm.errorTeamsUpdate, vm.$teamsId, vm.teams);
            }
            else {
                vm.$notificationsService.error("Please fill out all required fields.");
            }
        }

        //success&error handlers for ng-submit/updating teams:
        function _successTeamsUpdate(data) {
            vm.$notificationsService.success("Successfully updated your teams information!", data);
        }

        function _errorTeamsUpdate(jqXhr, error) {
            vm.$notificationsService.error("Could not update your changes ", error);
        }

    }
})();