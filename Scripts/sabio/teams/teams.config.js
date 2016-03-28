(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider.when('/teams/createTeam', {
                templateUrl: '/Scripts/sabio/teams/templates/createTeam.html',
                controller: 'createTeamController',
                controllerAs: 'create',
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }).when('/teams/:teamsId/basicInfo', {
                templateUrl: '/Scripts/sabio/teams/templates/basicInfo.html',
                controller: 'basicInfoController',
                controllerAs: 'basic',
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }).when('/teams/:teamsId/uploadAvatar', {
                templateUrl: '/Scripts/sabio/teams/templates/uploadAvatar.html',
                controller: 'uploadAvatarController',
                controllerAs: 'upload',
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }).when('/teams/:teamsId/manageAddress', {
                templateUrl: '/Scripts/sabio/teams/templates/manageAddress.html',
                controller: 'manageAddressController',
                controllerAs: 'address',
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            });

            $locationProvider.html5Mode(false);

        }]);
})();