(function () {
    "use strict";

    angular.module(APPNAME)
    .factory('$baseService', baseServiceFactory);

    baseServiceFactory.$inject = ['$window', '$location'];

    function baseServiceFactory($window, $location) {
        /*
            when this function is invoked by Angular, Angular wants an instance of the Service object.         
        */
        var getChangeNotifier = function ($scope) {
            /*
            will be called when there is an event outside Angular that has modified
            our data and we need to let Angular know about it.
            */
            var self = this;

            self.scope = $scope;

            return function (fx) {
                self.scope.$apply(fx);//this is the magic right here that cause ng to re-evaluate bindings
            }
        }
        var baseService = {
            $window: $window
            , getNotifier: getChangeNotifier
            , $location: $location
            , merge: $.extend
        };

        return baseService;
    }

})();