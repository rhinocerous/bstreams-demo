//notifications service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$notificationsService", notificationsServiceFactory);

    notificationsServiceFactory.$inject = ["$baseService", "$sabio"];

    function notificationsServiceFactory($baseService, $Sabio) {
        var notificationsSvcObj = sabio.services.notifications;
        var newService = $baseService.merge(true, {}, notificationsSvcObj, $baseService);

        return newService;
    }
})();
