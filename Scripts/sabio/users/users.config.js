(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider"
            , function ($routeProvider, $locationProvider) {

                $routeProvider
                    .when("/usersearch", {
                        templateUrl: "/Scripts/sabio/users/templates/index.html"
                        , controller: "indexController"
                        , controllerAs: "indexBoard"
                        , delay: function ($q, $timeout) {
                            var delay = $q.defer();
                            $timeout(delay.resolve, 1000);
                            return delay.promise;
                        }
                    })
                    .when("/:subscriptionType", {
                        templateUrl: "/Scripts/sabio/users/templates/users.html"
                        , controller: "teamsController"
                        , controllerAs: "teamsBoard"
                        , delay: function ($q, $timeout) {
                            var delay = $q.defer();
                            $timeout(delay.resolve, 1000);
                            return delay.promise;
                        }
                    })
                    .when("/:subscriptionType/teamDetails/:teamsId", {
                        templateUrl: "/Scripts/sabio/users/templates/teamDetails.html"
                        , controller: "teamDetailsController"
                        , controllerAs: "teamDetailsBoard"
                        , delay: function ($q, $timeout) {
                            var delay = $q.defer();
                            $timeout(delay.resolve, 1000);
                            return delay.promise;
                        }
                    })
                    .when("/:subscriptionType/:teamsId/userDetails/:userId", {
                        templateUrl: "/Scripts/sabio/users/templates/userDetails.html"
                    , controller: "userDetailsController"
                    , controllerAs: "userDetailsBoard"
                    , delay: function ($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    }
                    })
                    .when("/usersearch/:teamsId/userDetails/:userId", {
                        templateUrl: "/Scripts/sabio/users/templates/userDetails.html"
                        , controller: "userDetailsController"
                        , controllerAs: "userDetailsBoard"
                        , delay: function ($q, $timeout) {
                            var delay = $q.defer();
                            $timeout(delay.resolve, 1000);
                            return delay.promise;
                        }
                    })
                    .otherwise({
                        redirectTo: "/clients"
                    });

                $locationProvider.html5Mode(false);
            }]);
})();
