//Rights Types SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$rightsTypesService", rightsTypesServiceFactory);

    rightsTypesServiceFactory.$inject = ["$baseService", "$sabio"];

    function rightsTypesServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.rightsTypes;

        var rightsTypesService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return rightsTypesService;
    }
})();