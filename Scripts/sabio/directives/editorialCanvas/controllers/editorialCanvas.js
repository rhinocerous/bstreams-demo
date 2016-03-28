(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialCanvasDirectiveController', EditorialCanvas);

    EditorialCanvas.$inject = ['$scope', '$routeParams', '$baseController'];

    function EditorialCanvas(
        $scope        
        , $baseController) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.name = "editorialCanvasDirectiveController";        
       
        vm.$scope = $scope;
    }
})();