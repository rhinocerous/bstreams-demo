//MAINMENU SERVICE 
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$mainMenuService', mainMenuServiceFactory);

    mainMenuServiceFactory.$inject = ['$baseService', '$sabio'];

    function mainMenuServiceFactory($baseService
        , $sabio) {

        var aSabioServiceObject = sabio.services.mainMenu;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();