//USERBUCKETS SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$userBucketsService", userBucketsServiceFactory);

    userBucketsServiceFactory.$inject = ["$baseService", "$sabio"];

    function userBucketsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.userBuckets;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();
