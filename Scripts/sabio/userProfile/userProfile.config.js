(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

            //Fix the .when() lines!!
            //What do I use instead of :userId/ ?
            $routeProvider.when('/infoPassword', {
                templateUrl: '/Scripts/sabio/userProfile/templates/infoPassword.html',
                controller: 'userProfileInfoPasswordController',
                controllerAs: 'infoPassCtrl'

            }).when('/avatar', {
                templateUrl: '/Scripts/sabio/userProfile/templates/avatar.html',
                controller: 'userProfileAvatarController',
                controllerAs: 'avatarCtrl'

            }).when('/address', {
                templateUrl: '/Scripts/sabio/userProfile/templates/address.html',
                controller: 'userProfileAddressController',
                controllerAs: 'addressCtrl'
            });

            $locationProvider.html5Mode(false);
        }]);
})();