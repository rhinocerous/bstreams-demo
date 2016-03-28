(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

            $routeProvider.when('/createArticle', {
                templateUrl: '/Scripts/sabio/news/templates/create.html',
                controller: 'newsCreateController',
                controllerAs: 'createCtr'
            }).when('/editArticle/:newsId', {
                templateUrl: '/Scripts/sabio/news/templates/create.html',
                controller: 'newsCreateController',
                controllerAs: 'createCtr'
            }).when('/', {
                templateUrl: '/Scripts/sabio/news/templates/live.html',
                controller: 'newsLiveController',
                controllerAs: 'liveCtr'
            }).when('/linkArticle/:newsId', {
                templateUrl: '/Scripts/sabio/news/templates/linking.html',
                controller: 'newsLinkingController',
                controllerAs: 'linkCtr'
            }).when('/tagArticle/:newsId', {
                templateUrl: '/Scripts/sabio/news/templates/tagging.html',
                controller: 'newsTaggingController',
                controllerAs: 'tagCtr'
            });

            $locationProvider.html5Mode(false);

        }]);

})();