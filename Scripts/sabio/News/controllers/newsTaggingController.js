

(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('newsTaggingController', NewsTaggingController);

    NewsTaggingController.$inject = ['$scope', '$baseController', '$newsService', '$notificationsService', '$routeParams', '$location'];

    function NewsTaggingController(
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