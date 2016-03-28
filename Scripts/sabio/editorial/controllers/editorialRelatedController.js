(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialRelatedController', EditorialRelatedController);

    EditorialRelatedController.$inject = ['$scope', '$routeParams', '$baseController'];

    function EditorialRelatedController(
        $scope
        , $routeParams
        , $baseController) {

        var vm = this;
        vm.name = "editorialRelatedController";
        vm.$routeParams = $routeParams;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
    }
})();