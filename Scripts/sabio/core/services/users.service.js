//USER SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$usersService", usersServiceFactory);

    usersServiceFactory.$inject = ["$baseService", "$sabio"];

    function usersServiceFactory($baseService, $sabio) {
        var userInfoPassSvcObj = sabio.services.users;
        var newService = $baseService.merge(true, {}, userInfoPassSvcObj, $baseService);
        return newService;
    }
})();