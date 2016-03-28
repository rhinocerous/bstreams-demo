//MEDIA SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$mediaService", mediaServiceFactory);

    mediaServiceFactory.$inject = ["$baseService", "$sabio"];

    function mediaServiceFactory($baseService, $sabio) {
        var mediaSvcObj = sabio.services.media;
        var newService = $baseService.merge(true, {}, mediaSvcObj, $baseService);
        return newService;
    }
})();
