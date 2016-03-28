(function () {
    "use strict";

    angular.module(APPNAME)
        .service('$folderService', FolderServiceFactory);

    FolderServiceFactory.$inject = ['$baseService', '$sabio'];

    function FolderServiceFactory($baseService, $sabio) {
        var serviceObject = sabio.services.folders;
        var newService = $baseService.merge(true, {}, serviceObject, $baseService);

        return newService;
    }
})();