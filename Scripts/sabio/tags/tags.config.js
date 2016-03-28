(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
            $routeProvider.when('/tags/:tagSlug', {
                templateUrl: '/Scripts/sabio/tags/templates/tagsBrowser.html',
                controller: 'tagsBrowserController',
                controllerAs: 'tagsBrowser'
            });
            $locationProvider.html5Mode(false);
        }]);
})();