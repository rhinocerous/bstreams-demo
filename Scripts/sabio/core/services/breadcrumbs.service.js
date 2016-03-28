//BREADCRUMBS SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$breadcrumbsService", breadcrumbsServiceFactory);

    breadcrumbsServiceFactory.$sinject = ["$baseService", "$sabio"];

    function breadcrumbsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.breadcrumbs;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();