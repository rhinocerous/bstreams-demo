(function () {
    "use strict";

    angular.module(APPNAME)
        .controller("modalUsersEditController", modalUsersEditController);

    modalUsersEditController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$teamsService"
        , "$usersService"
        , "$routeParams"
        , "$uibModalInstance"
        , "headerText"
        , "teamsId"
        , "selectedRecord"];
})();

function modalUsersEditController($scope
    , $baseController
    , $notificationsService
    , $teamsService
    , $usersService
    , $routeParams
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
    vm.$uibModalInstance = $uibModalInstance;
    vm.headerText = headerText;
    vm.teamsId = teamsId;
    vm.selectedRecord = selectedRecord;

    vm.notify = vm.$teamsService.getNotifier($scope);
    vm.notify = vm.$usersService.getNotifier($scope);

    vm.formUsers = null;
    vm.inputFormUsers = {};
    vm.showFormUsersErrors = false;
    vm.subscriptionOptions = [   //vm.bucketOptions = null;
        { 'subscriptionType': 1, 'subscriptionName': 'Prospects' },
        { 'subscriptionType': 2, 'subscriptionName': 'Clients' },
        { 'subscriptionType': 3, 'subscriptionName': 'B-Team' },
    ]
    vm.teamsOptions = null;
    vm.roleOptions = null;
    vm.userRolesInServer = []

    vm.$subscriptionType = $routeParams.subscriptionType; //vm.$bucketId = $routeParams.bucketId;
    vm.selectedSubscriptionType = null; //vm.selectedUserBucket = vm.$bucketId - 1;
    vm.userIdUniqueIdentifier = null;
    vm.roleOptionsLength = null;
    vm.userRolesLength = null;

    vm.subscriptionTypeChange = _subscriptionTypeChange; //vm.bucketIdChange = _bucketIdChange;
    vm.roleCheck = _roleCheck;
    // vm.successUserBucketSelectAll = _successUserBucketSelectAll;
    // vm.errorUserBucketSelectAll = _errorUserBucketSelectAll;
    vm.successTeamsSelectBySubscriptionType = _successTeamsSelectBySubscriptionType; //vm.successTeamsSelectByBucketId = _successTeamsSelectByBucketId;
    vm.errorTeamsSelectBySubscriptionType = _errorTeamsSelectBySubscriptionType; //vm.errorTeamsSelectByBucketId = _errorTeamsSelectByBucketId;
    vm.successUsersGetUserDataPlusTeamsId = _successUsersGetUserDataPlusTeamsId;
    vm.errorUsersGetUserDataPlusTeamsId = _errorUsersGetUserDataPlusTeamsId;
    vm.successUsersLoadAllRoles = _successUsersLoadAllRoles;
    vm.errorUsersLoadAllRoles = _errorUsersLoadAllRoles;
    vm.successUsersGetUserRoles = _successUsersGetUserRoles;
    vm.errorUsersGetUserRoles = _errorUsersGetUserRoles;
    vm.successUsersEditFormSubmit = _successUsersEditFormSubmit;
    vm.errorUsersEditFormSubmit = _errorUsersEditFormSubmit;
    vm.convertToInt = _convertToInt;

    renderHTML();

    function renderHTML() {
        vm.showFormUsersErrors = false;

        vm.$usersService.getUserDataPlusTeamsId(vm.selectedRecord, vm.successUsersGetUserDataPlusTeamsId, vm.errorUsersGetUserDataPlusTeamsId);
    }

    vm.cancel = function () {
        vm.$uibModalInstance.dismiss("cancel");
    }

    vm.submit = function () {
        vm.showFormUsersErrors = true;

        if (vm.formUsers.$valid) {
            vm.$usersService.onEditFormSubmit(vm.userIdUniqueIdentifier, vm.inputFormUsers, vm.successUsersEditFormSubmit, vm.errorUsersEditFormSubmit);

        }
        else {
            vm.$notificationsService.error("Please provide valid inputs.");
        }
    }

    function _subscriptionTypeChange(type) {  // _bucketIdChange(bucketId)
        vm.$teamsService.selectBySubscriptionType(vm.successTeamsSelectBySubscriptionType, vm.errorTeamsSelectBySubscriptionType, type);
        //vm.$teamsService.selectByBucketId(bucketId, vm.successTeamsSelectByBucketId, vm.errorTeamsSelectByBucketId);
        //console.log(bucketId);
    }

    function _roleCheck(value, checked) {
        var idx = vm.user.roleSelected.indexOf(value);
       
        if (idx >= 0 && !checked) {
            vm.user.roleSelected.splice(idx, 1);
        }

        if (idx < 0 && checked) {
            vm.user.roleSelected.push(value);
        }
    }

    //function _successUserBucketSelectAll(data) {
    //    vm.notify(function () {
    //        vm.bucketOptions = data.items;

    //        console.log(vm.bucketOptions);

    //        vm.bucketId = vm.bucketOptions[vm.selectedUserBucket].bucketId;

    //        vm.$teamsService.selectByBucketId(vm.$bucketId, vm.successTeamsSelectByBucketId, vm.errorTeamsSelectByBucketId);
    //    });
    //}

    //function _errorUserBucketSelectAll(jqXhr, status, error) {
    //    vm.$notificationsService.error("Error in loading the User Bucket records. " + error);
    //}

    function _successTeamsSelectBySubscriptionType(data) { // _successTeamsSelectByBucketId(data)
        vm.notify(function () {
            vm.teamsOptions = data.items;

            console.log(vm.teamsOptions);

            vm.inputFormUsers.teamsId = vm.teamsId;
        });
    }

    function _errorTeamsSelectBySubscriptionType(jqXhr, status, error) {  // _errorTeamsSelectByBucketId(jqXhr, status, error)
        vm.$notificationsService.error("Error in loading the Team records. " + error);
    }

    function _successUsersGetUserDataPlusTeamsId(data) {
        vm.notify(function () {
            vm.inputFormUsers = data.items[0];

            console.log(vm.inputFormUsers);

            if (vm.inputFormUsers.active = true) {
                vm.isCheckedActive = true;
            }

            vm.userIdUniqueIdentifier = data.items[0].userID;

            vm.$usersService.loadAllRoles(vm.successUsersLoadAllRoles, vm.errorUsersLoadAllRoles);
        });
    }

    function _errorUsersGetUserDataPlusTeamsId(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the User records. " + error);
    }


    function _successUsersLoadAllRoles(data) {
        vm.notify(function () {
            vm.roleOptions = data.items;

            vm.roleOptionsLength = data.items.length;

            vm.$usersService.getUserRoles(vm.userIdUniqueIdentifier, vm.successUsersGetUserRoles, vm.errorUsersGetUserRoles);
        });
    }

    function _errorUsersLoadAllRoles(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading all the Roles records. " + error);
    }

    function _successUsersGetUserRoles(data) {
        vm.notify(function () {
            console.log("_successUsersGetUserRoles");

            if (data.items) {
                vm.userRolesLength = data.items.length;

                for (var i = 0; i < vm.roleOptionsLength; i++) {
                    for (var j = 0 ; j < vm.userRolesLength; j++) {
                        if (vm.roleOptions[i].roleId == data.items[j]) {
                            if (vm.user) {
                                vm.user.roleSelected.push(vm.roleOptions[i]);
                            }
                            else {
                                vm.user = {
                                    roleSelected: [vm.roleOptions[i]]
                                };
                            }
                        }
                    }
                }

                /*
                console.log("vm.user:");
                console.log(vm.user);

                vm.userRolesInServer = vm.user;

                console.log("vm.userRolesInServer:");
                console.log(vm.userRolesInServer);
                */
            }
            else {

            }

            //vm.$userBucketsService.selectAll(vm.successUserBucketSelectAll, vm.errorUserBucketSelectAll);

            //vm.bucketId = vm.bucketOptions[vm.selectedUserBucket].bucketId;
            vm.subscriptionType = vm.subscriptionOptions[vm.convertToInt(vm.$subscriptionType) - 1].subscriptionType;
            vm.$teamsService.selectBySubscriptionType(vm.successTeamsSelectBySubscriptionType, vm.errorTeamsSelectBySubscriptionType, vm.convertToInt(vm.$subscriptionType));
        });
    }

    function _errorUsersGetUserRoles(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the User Roles records. " + error);
    }

    function _successUsersEditFormSubmit(data) {
        vm.$uibModalInstance.dismiss("successEdit");
    }

    function _errorUsersEditFormSubmit(jqXhr, status, error) {
        vm.$uibModalInstance.dismiss("errorEdit");
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