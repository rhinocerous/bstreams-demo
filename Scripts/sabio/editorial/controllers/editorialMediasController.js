(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialMediasController', EditorialMediasController);

    EditorialMediasController.$inject = ['$scope', '$routeParams', '$baseController'];

    function EditorialMediasController(
        $scope
        , $routeParams
        , $baseController) {

        var vm = this;
        vm.name = "editorialMediasController";
        vm.$routeParams = $routeParams;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
    }
})();