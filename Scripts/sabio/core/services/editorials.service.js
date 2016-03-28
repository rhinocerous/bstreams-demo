(function () {
    "use strict";

    angular.module(APPNAME)
        .service('$editorialService', EditorialServiceFactory);

    EditorialServiceFactory.$inject = ['$baseService', '$sabio'];

    function EditorialServiceFactory($baseService, $sabio) {
        var serviceObject = sabio.services.editorials;
        var newService = $baseService.merge(true, {}, serviceObject, $baseService);

        return newService;
    }

})();