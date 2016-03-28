(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$systemEventService', serviceFactory);

    serviceFactory.$inject = ['$baseService', '$rootScope'];

    function serviceFactory($baseService, $rootScope) {
        var svc = this;

        $.extend(svc, $baseService);

        svc.$rootScope = $rootScope;

        svc.listen = _listen;
        svc.broadcast = _broadcast;

        function _listen(event, callback) {
            svc.$rootScope.$on(event, callback);
        }

        function _broadcast() {
            svc.$rootScope.$broadcast(arguments[0], arguments);
        }

        return svc;
    }

})();