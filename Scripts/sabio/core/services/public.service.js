//PUBLIC SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$publicService", publicServiceFactory);

    publicServiceFactory.$inject = ["$baseService", "$sabio"];

    function publicServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.public;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();
