(function () {
    "use strict";

    angular.module(APPNAME)
        .controller("modalTeamsController", modalTeamsController);

    modalTeamsController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$teamsService"
        , "$routeParams"
        , "$uibModal"
        , "$uibModalInstance"
        , "headerText"
        , "selectedRecord"];

function modalTeamsController($scope
    , $baseController
    , $notificationsService
    , $teamsService
    , $routeParams
    , $uibModal
    , $uibModalInstance
    , headerText
    , selectedRecord) {

    var vm = this;

    $baseController.merge(vm, $baseController);

    vm.$scope = $scope;
    vm.$notificationsService = $notificationsService;
    vm.$teamsService = $teamsService;
    vm.$uibModal = $uibModal;
    vm.$uibModalInstance = $uibModalInstance;
    vm.headerText = headerText;
    vm.selectedRecord = selectedRecord;

    vm.notify = vm.$teamsService.getNotifier($scope);

    vm.formTeams = null;
    vm.inputFormTeams = {};
    vm.showFormTeamsErrors = false;
    vm.subscriptionTypeOptions = [   //vm.bucketOptions = null;
        { 'subscriptionType': 1, 'subscriptionName': 'Prospects' },
        { 'subscriptionType': 2, 'subscriptionName': 'Clients' },
        { 'subscriptionType': 3, 'subscriptionName': 'B-Team' },
    ]
    vm.$subscriptionType = $routeParams.subscriptionType; //vm.$bucketId = $routeParams.bucketId;
    //vm.selectedUserBucket = null; //vm.selectedUserBucket = vm.$bucketId - 1;

    vm.keyUpSlug = _keyUpSlug;
    //vm.successUserBucketSelectAll = _successUserBucketSelectAll;
    //vm.errorUserBucketSelectAll = _errorUserBucketSelectAll;
    vm.successTeamsInsert = _successTeamsInsert;
    vm.errorTeamsInsert = _errorTeamsInsert;
    vm.successTeamsSelectByTeamsId = _successTeamsSelectByTeamsId
    vm.errorTeamsSelectByTeamsId = _errorTeamsSelectByTeamsId;
    vm.successTeamsUpdate = _successTeamsUpdate;
    vm.errorTeamsUpdate = _errorTeamsUpdate;

    vm.convertToInt = _convertToInt;
    //vm.subscriptionType = null;

    //To open subscription modal after new team is added
    vm.teamOpenSubModal = _teamOpenSubModal;

    renderHTML();

    function renderHTML() {
        vm.showFormTeamsErrors = false;
        vm.isDisabledSlug = true;

        //vm.$userBucketsService.selectAll(vm.successUserBucketSelectAll, vm.errorUserBucketSelectAll);
        //vm.inputFormTeams.bucketId = vm.bucketOptions[vm.selectedUserBucket-1].bucketId;
        

        if (vm.headerText == "Add Team") {
            vm.inputFormTeams = {
                active: true,
                sourceId: 2,
                parentTeamsId: 0
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
        vm.showFormTeamsErrors = true;

        if (vm.formTeams.$valid) {
            if (vm.headerText == "Add Team") {
                vm.$teamsService.onTeamsInsert(vm.successTeamsInsert, vm.errorTeamsInsert, vm.inputFormTeams);
            }
            else {
                vm.$teamsService.onTeamsUpdate(vm.successTeamsUpdate, vm.errorTeamsUpdate, vm.selectedRecord, vm.inputFormTeams);
            }
        }
        else {
            vm.$notificationsService.error("Please provide valid inputs.");
        }
    }

    function _keyUpSlug() {
        if (vm.inputFormTeams.title != null) {
            var slug = vm.inputFormTeams.title.replace(/\W+/g, '-').toLowerCase();

            vm.inputFormTeams.slug = slug;
        }
    }

    //function _successUserBucketSelectAll(data) {
    //    vm.notify(function () {
    //        vm.bucketOptions = data.items;

    //        vm.inputFormTeams.bucketId= vm.bucketOptions[vm.selectedUserBucket].bucketId;
    //    });
    //}

    //function _errorUserBucketSelectAll(jqXhr, status, error) {
    //    vm.$notificationsService.error("Error in loading the User Bucket records. " + error);
    //}

    function _successTeamsInsert(data) {
        vm.$uibModalInstance.dismiss("successAdd");

        //dismiss the add user modal after submitting
        //then, open up create new subscription modal for this new team
        vm.teamOpenSubModal(data.item);
    }

    function _errorTeamsInsert(jqXhr, status, error) {
        vm.$uibModalInstance.dismiss("errorAdd");
    }

    function _successTeamsSelectByTeamsId(data) {
        vm.notify(function () {
            vm.inputFormTeams = data.item;
            vm.inputFormTeams.subscriptionType = vm.subscriptionTypeOptions[vm.convertToInt(vm.$subscriptionType) - 1].subscriptionType;
        });
    }

    function _errorTeamsSelectByTeamsId(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the Team record. " + error);
    }

    function _successTeamsUpdate(data) {
        vm.$uibModalInstance.dismiss("successEdit");
    }

    function _errorTeamsUpdate(jqXhr, status, error) {

        vm.$uibModalInstance.dismiss("errorEdit");
    }

    function _teamOpenSubModal(selectedTeam) {

        var selectedUser, selectedTeam;

        var modalInstance = vm.$uibModal.open({
            animation: true,
            templateUrl: '/Scripts/sabio/subscriptions/templates/subscriptionsModal.html',
            windowClass: 'modal modal-message fade in modalNg',
            controller: 'subscriptionsModalController as mc',
            resolve: {
                selectedUser: function () {
                    return null;
                },
                selectedTeam: function () {
                    return selectedTeam;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            console.log(selectedTeam);
        });
    }

    function _convertToInt(subscriptionType) {
        if (subscriptionType == "prospects") {
            return 1;
        } else if (subscriptionType == "clients") {
            return 2;
        } else {
            return 3;
        }
    }
}

})();
