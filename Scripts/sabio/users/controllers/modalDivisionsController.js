(function () {
    "use strict";

    angular.module(APPNAME)
        .controller("modalDivisionsController", modalDivisionsController);

    modalDivisionsController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$teamsService"
        , "$routeParams"
        , "$uibModalInstance"
        , "headerText"
        , "parentTeamsId"
        , "parentTeamsTitle"
        , "selectedRecord"];

    function modalDivisionsController($scope
        , $baseController
        , $notificationsService
        , $teamsService
        , $routeParams
        , $uibModalInstance
        , headerText
        , parentTeamsId
        , parentTeamsTitle
        , selectedRecord) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$notificationsService = $notificationsService;
        vm.$teamsService = $teamsService;
        vm.$uibModalInstance = $uibModalInstance;
        vm.headerText = headerText;
        vm.parentTeamsId = parentTeamsId;
        vm.parentTeamsTitle = parentTeamsTitle;
        vm.selectedRecord = selectedRecord;

        vm.notify = vm.$teamsService.getNotifier($scope);

        vm.formDivisions = null;
        vm.inputFormDivisions = {};
        vm.showFormDivisionsErrors = false;
        //vm.bucketOptions = null;
        //vm.$bucketId = $routeParams.bucketId;
        //vm.selectedUserBucket = vm.$bucketId - 1;

        vm.keyUpSlug = _keyUpSlug;
        //vm.successUserBucketSelectAll = _successUserBucketSelectAll;
        //vm.errorUserBucketSelectAll = _errorUserBucketSelectAll;
        vm.successTeamsInsert = _successTeamsInsert;
        vm.errorTeamsInsert = _errorTeamsInsert;
        vm.successTeamsSelectByTeamsId = _successTeamsSelectByTeamsId
        vm.errorTeamsSelectByTeamsId = _errorTeamsSelectByTeamsId;
        vm.successTeamsUpdate = _successTeamsUpdate;
        vm.errorTeamsUpdate = _errorTeamsUpdate;

        renderHTML();

        function renderHTML() {
            vm.showFormTeamsErrors = false;
            vm.isDisabledSlug = true;

            //vm.$userBucketsService.selectAll(vm.successUserBucketSelectAll, vm.errorUserBucketSelectAll);

            if (vm.headerText == "Add Division") {
                vm.inputFormDivisions = {
                    active: true,
                    sourceId: 2,
                    parentTeamsId: vm.parentTeamsId
                };

                vm.isCheckedActive = true;
            }
            else {
                vm.isCheckedActive = false;

                vm.$teamsService.onTeamsSelectByTeamsId(vm.successTeamsSelectByTeamsId, vm.errorTeamsSelectByTeamsId, vm.selectedRecord);
            }
        }

        vm.cancel = function () {
            vm.$uibModalInstance.dismiss("cancel");
        }

        vm.submit = function () {
            vm.showFormDivisionsErrors = true;

            if (vm.formDivisions.$valid) {
                if (vm.headerText == "Add Division") {
                    vm.$teamsService.onTeamsInsert(vm.successTeamsInsert, vm.errorTeamsInsert, vm.inputFormDivisions);
                }
                else {
                    vm.$teamsService.onTeamsUpdate(vm.successTeamsUpdate, vm.errorTeamsUpdate, vm.selectedRecord, vm.inputFormDivisions);
                }
            }
            else {
                vm.$notificationsService.error("Please provide valid inputs.");
            }
        }

        function _keyUpSlug() {
            if (vm.inputFormDivisions.title != null) {
                var slug = vm.inputFormDivisions.title.replace(/\W+/g, '-').toLowerCase();

                vm.inputFormDivisions.slug = slug;
            }
        }

        //function _successUserBucketSelectAll(data) {
        //    vm.notify(function () {
        //        vm.bucketOptions = data.items;

        //        vm.inputFormDivisions.bucketId = vm.bucketOptions[vm.selectedUserBucket].bucketId;
        //    });
        //}

        //function _errorUserBucketSelectAll(jqXhr, status, error) {
        //    vm.$notificationsService.error("Error in loading the User Bucket records. " + error);
        //}

        function _successTeamsInsert(data) {
            vm.$uibModalInstance.dismiss("successAdd");
        }

        function _errorTeamsInsert(jqXhr, status, error) {
            vm.$uibModalInstance.dismiss("errorAdd");
        }

        function _successTeamsSelectByTeamsId(data) {
            vm.notify(function () {
                vm.inputFormDivisions = data.item;
            });
        }

        function _errorTeamsSelectByTeamsId(jqXhr, status, error) {
            vm.$notificationsService.error("Error in loading the Division record. " + error);
        }

        function _successTeamsUpdate(data) {
            vm.$uibModalInstance.dismiss("successEdit");
        }

        function _errorTeamsUpdate(jqXhr, status, error) {

            vm.$uibModalInstance.dismiss("errorEdit");
        }
    }

})();