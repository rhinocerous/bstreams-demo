(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider.when('/medialibrary/IndexNg4', {
                templateUrl: '/Scripts/sabio/mediaLibrary/templates/mainTemplate',
                controller: 'ng4TreeController',
                controllerAs: 'TC'
            });
            $locationProvider.html5Mode(false);
        }]);
})();