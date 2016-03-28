(function () {
    "use strict";

    angular.module(APPNAME)
        .service('$editorialContentService', EditorialContentServiceFactory);

    EditorialContentServiceFactory.$inject = ["$baseService", "$sabio"];

    function EditorialContentServiceFactory($baseService, $sabio) {
        var editorialSvcObj = sabio.services.editorialContent;
        var newService = $baseService.merge(true, {}, editorialSvcObj, $baseService);

        return newService;
    }

})();