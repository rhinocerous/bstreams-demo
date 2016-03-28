(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$addressesService', addressesServiceFactory);

    addressesServiceFactory.$inject = ['$baseService', '$sabio'];

    function addressesServiceFactory($baseService, $sabio) {
        var addressSvcObj = sabio.services.addresses;

        var newService = $baseService.merge(true, {}, addressSvcObj, $baseService);

        return newService;
    }
})();