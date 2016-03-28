//SUBSCRIPTION SERVICE
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$subscriptionsService', subscriptionsServiceFactory);

    subscriptionsServiceFactory.$inject = ['$baseService', '$sabio'];

    function subscriptionsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.subscriptions;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();
