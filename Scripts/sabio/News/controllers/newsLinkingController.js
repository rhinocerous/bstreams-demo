

(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('newsLinkingController', NewsLinkingController);

    NewsLinkingController.$inject = ['$scope', '$baseController', '$newsService', '$notificationsService', '$routeParams', '$location'];

    function NewsLinkingController(
        $scope
        , $baseController
        , $newsService
        , $notificationsService
        , $routeParams
        , $location) {

        var vm = this;

        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        


    }
})();