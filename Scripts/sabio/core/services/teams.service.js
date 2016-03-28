//TEAMS SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$teamsService", teamsServiceFactory);

    teamsServiceFactory.$inject = ["$baseService", "$sabio"];

    function teamsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.teams;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();
