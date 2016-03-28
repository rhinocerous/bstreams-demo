

(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('newsLiveController', NewsLiveController);

    NewsLiveController.$inject = ['$scope'
        , '$baseController'
        , '$newsService'
        , '$notificationsService'
        , '$routeParams'
        , '$location'];

    function NewsLiveController(
        $scope
        , $baseController
        , $newsService
        , $notificationsService
        , $routeParams
        , $location) {

        var vm = this;
        

        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        vm.$newsService = $newsService;
        vm.$routeParams = $routeParams;
        vm.$notificationsService = $notificationsService;

        $baseController.merge(vm, $baseController);
        vm.notify = vm.$newsService.getNotifier($scope);
        vm.helpImage = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";

        vm.onSuccessAddArticles = _onSuccessAddArticles;
        vm.onErrorAddArticles = _onErrorAddArticles;

        vm.items = null;

        render();

        function render() {
            vm.$newsService.selectAll(vm.onSuccessAddArticles, vm.onErrorAddArticles);
            console.log("we got all the articles");
        }

        function _onSuccessAddArticles(data) {
            vm.notify(function () {
                vm.items = data.items;
            });
        }
       
        function _onErrorAddArticles(jqXhr, error) {
            vm.$notificationsService.error("Error in loading the articles." + error);
        }

    }
})();