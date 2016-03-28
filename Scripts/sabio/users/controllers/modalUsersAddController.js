(function () {
    "use strict";

    angular.module(APPNAME)
        .controller("modalUsersAddController", modalUsersAddController);

    modalUsersAddController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$teamsService"
        , "$usersService"
        , "$publicService"
        , "$routeParams"
        , "$uibModal"
        , "$uibModalInstance"
        , "headerText"
        , "teamsId"
        , "selectedRecord"];
})();

function modalUsersAddController($scope
    , $baseController
    , $notificationsService
    , $teamsService
    , $usersService
    , $publicService
    , $routeParams
    , $uibModal
    , $uibModalInstance
    , headerText
    , teamsId
    , selectedRecord) {

    var vm = this;

    $baseController.merge(vm, $baseController);

    vm.$scope = $scope;
    vm.$notificationsService = $notificationsService;
    vm.$teamsService = $teamsService;
    vm.$usersService = $usersService;
    vm.$publicService = $publicService;
    vm.$uibModal = $uibModal;
    vm.$uibModalInstance = $uibModalInstance;
    vm.headerText = headerText;
    vm.teamsId = teamsId;
    vm.selectedRecord = selectedRecord;

    vm.notify = vm.$teamsService.getNotifier($scope);
    vm.notify = vm.$usersService.getNotifier($scope);
    vm.notify = vm.$publicService.getNotifier($scope);

    vm.formUsers = null;
    vm.inputFormUsers = {};
    vm.showFormUsersErrors = false;
    vm.subscriptionTypeOptions = [   //vm.bucketOptions = null;
        { 'subscriptionType': 1, 'subscriptionName': 'Prospects' },
        { 'subscriptionType': 2, 'subscriptionName': 'Clients' },
        { 'subscriptionType': 3, 'subscriptionName': 'B-Team' },
    ]
    vm.teamsOptions = null;

    vm.$subscriptionType = $routeParams.subscriptionType; //vm.$bucketId = $routeParams.bucketId;
    vm.userIdUniqueIdentifier = null;

    vm.subscriptionTypeChange = _subscriptionTypeChange; //vm.bucketIdChange = _bucketIdChange;
    //vm.successUserBucketSelectAll = _successUserBucketSelectAll;
    //vm.errorUserBucketSelectAll = _errorUserBucketSelectAll;
    vm.successTeamsSelectBySubscriptionType = _successTeamsSelectBySubscriptionType; //vm.successTeamsSelectByBucketId = _successTeamsSelectByBucketId;
    vm.errorTeamsSelectBySubscriptionType = _errorTeamsSelectBySubscriptionType; // vm.errorTeamsSelectByBucketId = _errorTeamsSelectByBucketId;
    vm.successPublicRegistrationFormSubmit = _successPublicRegistrationFormSubmit;
    vm.errorPublicRegistrationFormSubmit = _errorPublicRegistrationFormSubmit;

    vm.subscriptionType = null;
    vm.convertToInt = _convertToInt;

    //To open subscription modal after new user is added
    vm.userOpenSubModal = _userOpenSubModal;

    renderHTML();

    function renderHTML() {
        vm.showFormUsersErrors = false;

        vm.inputFormUsers = {
            active: true,
            sourceId: 2
        };

        vm.isCheckedActive = true;

        //vm.$userBucketsService.selectAll(vm.successUserBucketSelectAll, vm.errorUserBucketSelectAll);
        vm.subscriptionType = vm.subscriptionTypeOptions[vm.convertToInt(vm.$subscriptionType) - 1].subscriptionType;
        vm.$teamsService.selectBySubscriptionType(vm.successTeamsSelectBySubscriptionType, vm.errorTeamsSelectBySubscriptionType, vm.convertToInt(vm.$subscriptionType));

    }

    vm.cancel = function () {
        vm.$uibModalInstance.dismiss("cancel");
    }

    vm.submit = function () {
        vm.showFormUsersErrors = true;

        if (vm.formUsers.$valid) {
            console.log(vm.inputFormUsers);

            vm.$publicService.onRegistrationFormSubmit(vm.inputFormUsers, vm.successPublicRegistrationFormSubmit, vm.errorPublicRegistrationFormSubmit);
        }
        else {
            vm.$notificationsService.error("Please provide valid inputs.");
        }
    }

    function _subscriptionTypeChange(subscriptionType) { //_bucketIdChange(bucketId)
        vm.$teamsService.selectBySubscriptionType(vm.successTeamsSelectBySubscriptionType, vm.errorTeamsSelectBySubscriptionType, subscriptionType);
        //vm.$teamsService.selectByBucketId(bucketId, vm.successTeamsSelectByBucketId, vm.errorTeamsSelectByBucketId);
    }

    //function _successUserBucketSelectAll(data) {
    //    vm.notify(function () {
    //        vm.bucketOptions = data.items;

    //        vm.bucketId = vm.bucketOptions[vm.selectedUserBucket].bucketId;

    //        vm.$teamsService.selectByBucketId(vm.$bucketId, vm.successTeamsSelectByBucketId, vm.errorTeamsSelectByBucketId);
    //    });
    //}

    //function _errorUserBucketSelectAll(jqXhr, status, error) {
    //    vm.$notificationsService.error("Error in loading the User Bucket records. " + error);
    //}

    function _successTeamsSelectBySubscriptionType(data) { //_successTeamsSelectByBucketId(data)
        vm.notify(function () {
            vm.teamsOptions = data.items;

            vm.inputFormUsers.teamsId = vm.teamsId;

            console.log("vm.inputFormUsers.teamsId: "  + vm.inputFormUsers.teamsId);
            
        });
    }

    function _errorTeamsSelectBySubscriptionType(jqXhr, status, error) { //_errorTeamsSelectByBucketId(jqXhr, status, error)
        vm.$notificationsService.error("Error in loading the Team records. " + error);
    }

    function _successPublicRegistrationFormSubmit(data) {
        vm.$uibModalInstance.dismiss("successAdd");

        //dismiss the add user modal after submitting
        //then, open up create new subscription modal for this new user
        vm.userOpenSubModal(data.item.id);
    }

    function _errorPublicRegistrationFormSubmit(jqXhr, status, error) {
        vm.$uibModalInstance.dismiss("errorAdd");
    }

    function _userOpenSubModal(selectedUser) {

        var selectedUser, selectedTeam;

        var modalInstance = vm.$uibModal.open({
            animation: true,
            templateUrl: '/Scripts/sabio/subscriptions/templates/subscriptionsModal.html',
            windowClass: 'modal modal-message fade in modalNg',
            controller: 'subscriptionsModalController as mc',
            resolve: {
                selectedUser: function () {
                    return selectedUser;
                },
                selectedTeam: function () {
                    return null;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            console.log(selectedUser);
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