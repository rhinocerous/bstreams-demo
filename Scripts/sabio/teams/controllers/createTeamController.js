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
        .controller('createTeamController', CreateTeamController);

    CreateTeamController.$inject = ['$scope',
        '$baseController',
        '$routeParams',
        '$teamsService',
        '$userBucketService',
        '$mediaService',
        '$notificationsService',
        '$location'];

    function CreateTeamController(
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

        vm.items = null;
        vm.teams = null;
        vm.teamsForm = null;
        vm.bucketOptions = null;
        vm.showTeamsErrors = false;
        vm.displayMedia = null;
        vm.mediaForm = null;
        vm.$teamsId = $routeParams.teamsId;
        
        console.log($routeParams.teamsId);

        vm.submitTeamsInformation = _submitTeamsInformation;

        vm.successTeamsInsert = _successTeamsInsert;
        vm.errorTeamsInsert = _errorTeamsInsert;
        vm.successUserBucketSelectAll = _successUserBucketSelectAll;
        vm.errorUserBucketSelectAll = _errorUserBucketSelectAll;

        $baseController.merge(vm, $baseController);
        vm.notify = vm.$teamsService.getNotifier($scope);
        vm.notify = vm.$mediaService.getNotifier($scope);


        //renders userBucket dropdown
        render();

        function render() {
            vm.$userBucketService.selectAll(vm.successUserBucketSelectAll, vm.errorUserBucketSelectAll);
        }

        //success&&error handlers for selecting user buckets options:
        function _successUserBucketSelectAll(data) {
            vm.notify(function () {
                vm.bucketOptions = data.items;
                console.log(vm.bucketOptions);
            });
        }

        function _errorUserBucketSelectAll(jqXhr, error) {
            vm.$notificationsService.error("Error in loading the User Bucket records. " + error);
        }

        //on ng-submit:
        function _submitTeamsInformation() {
            vm.showTeamsErrors = true;
            if (vm.teamsForm.$valid) {
                vm.$teamsService.onTeamsInsert(vm.successTeamsInsert, vm.errorTeamsInsert, vm.teams);
            }
            else {
                vm.$notificationsService.error("Invalid form submission.");
            }
        }


        //success&&error handlers _submitTeamsInformation 
        function _successTeamsInsert(data) {
            console.log("returned data from the insert success handler:", data.item);
            vm.$teamsId = data.item;
            //will take you over to 'upload avatar' on success:         
            setTimeout(function () {
                vm.notify(function () {
                    vm.$location.url('teams/' + vm.$teamsId + '/uploadAvatar');
                }, 5000);
            });
            vm.$notificationsService.success("Successfully added a Teams record.");
        }

        function _errorTeamsInsert(jqXhr, error) {
            vm.$notificationsService.error("Error in inserting a Teams record. " + error);
        }

    };

})();