//imageDetails SERVICE:
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$imageDetailsService", imageDetailsServiceFactory);

    imageDetailsServiceFactory.$inject = ["$baseService", "$sabio"];

    function imageDetailsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.imageDetails;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();
