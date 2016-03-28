(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$reportingOutputService', reportingOutputServiceFactory);

    reportingOutputServiceFactory.$inject = ['$baseService', '$sabio'];

    function reportingOutputServiceFactory($baseService, $sabio) {
        var reportingOutputSvcObj = sabio.services.reportingOutput;

        var newService = $baseService.merge(true, {}, reportingOutputSvcObj, $baseService);

        return newService;
    }
})();