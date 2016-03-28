(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$newsService", newsServiceFactory);

    newsServiceFactory.$inject = ["$baseService", "$sabio"];

    function newsServiceFactory($baseService, $Sabio) {
        var newsSvcObj = sabio.services.news;
        var newService = $baseService.merge(true, {}, newsSvcObj, $baseService);

        return newService;
    }
})();
