(function () {
    "use strict"

    angular.module(APPNAME)
        .controller("teamsController", teamsController);

    teamsController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$teamsService"
        , "$subscriptionsService"
        , "$routeParams"
        , "$location"
        , "$uibModal"
        , "$anchorScroll"];
})();

function teamsController($scope
    , $baseController
    , $notificationsService
    , $teamsService
    , $subscriptionsService
    , $routeParams
    , $location
    , $uibModal
    , $anchorScroll) {

    var vm = this;

    $baseController.merge(vm, $baseController);

    vm.$scope = $scope;
    vm.$notificationsService = $notificationsService;
    vm.$teamsService = $teamsService;
    vm.$location = $location;
    vm.$uibModal = $uibModal;
    vm.$anchorScroll = $anchorScroll;

    vm.notify = vm.$teamsService.getNotifier($scope);

    /* Parent Team */

    vm.oneAtATime = true;
    vm.showTeamsRecords = false;
    vm.showUsersRecords = false;
    vm.showNoTeamsMessage = false;
    vm.showNoUsersMessage = false;
    vm.loadingUsers = false;
    vm.tableHeaderNameId = true;
    vm.itemsPerPageTeams = null;
    vm.itemsPerPageUsers = null;
    vm.teamsRecords = null;
    vm.usersRecords = null;
    vm.sortKeyTeams = null;
    vm.sortKeyUsers = null;
    vm.reverseTeams = false;
    vm.reverseUsers = false;
    vm.paginationSizeUsers = null;
    vm.paginationSizeTeams = null;

    vm.sortTeams = _sortTeams;
    vm.sortUsers = _sortUsers;
    vm.openModalTeams = _openModalTeams;
    vm.expandAccordion = _expandAccordion;
    vm.viewTeam = _viewTeam;
    vm.viewUser = _viewUser;
    vm.openModalUsersAdd = _openModalUsersAdd;
    vm.openModalUsersEdit = _openModalUsersEdit;

    vm.$subscriptionType = $routeParams.subscriptionType; //vm.$bucketId = $routeParams.bucketId;
    vm.teamsId = null;

    vm.loadTabBySubscriptionType = _loadTabBySubscriptionType; //vm.loadTabByBucketId = _loadTabByBucketId;
    vm.loadUsersByTeamsId = _loadUsersByTeamsId;
    
    // vm.successTeamsSelectByBucketId = _successTeamsSelectByBucketId;
    // vm.errorTeamsSelectByBucketId = _errorTeamsSelectByBucketId;
    vm.successTeamsSelectTeamsParents = _successTeamsSelectTeamsParents;
    vm.errorTeamsSelectTeamsParents = _errorTeamsSelectTeamsParents;
    vm.successUsersTeamsSelectUsersByTeamsId = _successUsersTeamsSelectUsersByTeamsId;
    vm.errorUsersTeamsSelectUsersByTeamsId = _errorUsersTeamsSelectUsersByTeamsId;

    //SUBSCRIPTION MODAL FUNCTIONS
    vm.teamOpenSubModal = _teamOpenSubModal;
    vm.userOpenSubModal = _userOpenSubModal;
   
    //PERMISSION MODAL FUNCTION
    vm.userPermissionsOpenSubModal = _userPermissionsOpenSubModal;

    /* Department - Sub Team */

    vm.oneAtATimeDivisions = true;
    vm.showTeamsRecordsDivisions = false;
    vm.showUsersRecordsDivisions = false;
    vm.showNoUsersMessageDivisions = false;
    vm.loadingUsersDivisions = false;
    vm.tableHeaderNameIdDivisions = true;
    vm.itemsPerPageTeamsDivisions = null;
    vm.itemsPerPageUsersDivisions = null;
    vm.teamsRecordsDivisions = null;
    vm.usersRecordsDivisions = null;
    vm.sortKeyTeamsDivisions = null;
    vm.sortKeyUsersDivisions = null;
    vm.reverseTeamsDivisions = false;
    vm.reverseUsersDivisions = false;
    vm.paginationSizeUsersDivisions = null;
    vm.paginationSizeTeamsDivisions = null;

    vm.sortTeamsDivisions = _sortTeamsDivisions;
    vm.sortUsersDivisions = _sortUsersDivisions;
    vm.openModalDivisions = _openModalDivisions;
    vm.expandAccordionDivisions = _expandAccordionDivisions;

    vm.loadUsersByTeamsIdDivisions = _loadUsersByTeamsIdDivisions;

    vm.successTeamsSelectTeamsDivisions = _successTeamsSelectTeamsDivisions;
    vm.errorTeamsSelectTeamsDivisions = _errorTeamsSelectTeamsDivisions;
    vm.successUsersTeamsSelectUsersByTeamsIdDivisions = _successUsersTeamsSelectUsersByTeamsIdDivisions;
    vm.errorUsersTeamsSelectUsersByTeamsIdDivisions = _errorUsersTeamsSelectUsersByTeamsIdDivisions;

    vm.convertToInt = _convertToInt;
    vm.addLabel = _addLabel;

    //console.log("subscription type", vm.$subscriptionType);

    renderHTML();

    function renderHTML() {
        vm.itemsPerPageTeams = "50";
        vm.itemsPerPageUsers = 10;
        vm.itemsPerPageUsersDivisions = 10;

        vm.paginationSizeUsers = 5;
        vm.paginationSizeUsersDivisions = 5;
        vm.paginationSizeTeams = 10;
        vm.paginationSizeTeamsDivisions = 10;

        vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
    }

    function _loadTabBySubscriptionType(type) { // function _loadTabByBucketId(bucketId)
        vm.$teamsService.selectBySubscriptionType(vm.successTeamsSelectTeamsParents, vm.errorTeamsSelectTeamsParents, type);

        //if (subscriptionType != "usersearch") {
        //    // vm.$teamsService.selectByBucketId(bucketId, vm.successTeamsSelectByBucketId, vm.errorTeamsSelectByBucketId);
        //    //vm.$teamsService.onTeamsSelectTeamsParents(bucketId, vm.successTeamsSelectTeamsParents, vm.errorTeamsSelectTeamsParents);
        //}
        //else {
        //    console.log("usersearch");
        //}
    }

    function _expandAccordion(teamsId) {
        vm.usersRecords = null;

        vm.teamsId = teamsId;

        vm.$teamsService.onTeamsSelectTeamsDivisions(teamsId, vm.successTeamsSelectTeamsDivisions, vm.errorTeamsSelectTeamsDivisions);
    }

    function _expandAccordionDivisions(teamsDivisionId) {
        vm.usersRecordsDivisions = null;

        vm.teamsId = teamsDivisionId;

        vm.loadUsersByTeamsIdDivisions(teamsDivisionId);
    }

    function _loadUsersByTeamsId(teamsId) {
        vm.loadingUsers = true;

        vm.$teamsService.onUsersTeamsSelectUsersByTeamsId(vm.successUsersTeamsSelectUsersByTeamsId, vm.errorUsersTeamsSelectUsersByTeamsId, teamsId)
    }

    function _loadUsersByTeamsIdDivisions(teamsId) {
        vm.loadingUsersDivisions = true;

        vm.$teamsService.onUsersTeamsSelectUsersByTeamsId(vm.successUsersTeamsSelectUsersByTeamsIdDivisions, vm.errorUsersTeamsSelectUsersByTeamsIdDivisions, teamsId)
    }

    function _sortTeams(teamsTitle) {
        console.log("sortTeams");

        vm.sortKeyTeams = teamsTitle;

        vm.reverseTeams = !vm.reverseTeams;
    }

    function _sortTeamsDivisions(teamsTitle) {
        console.log("sortTeamsDivisions");

        vm.sortKeyTeamsDivisions = teamsTitle;

        vm.reverseTeamsDivisions = !vm.reverseTeamsDivisions;
    }

    function _sortUsers(tableHeaderName) {
        console.log("sortUsers");

        vm.sortKeyUsers = tableHeaderName;

        vm.reverseUsers = !vm.reverseUsers;

        if (tableHeaderName != 'id') {
            vm.tableHeaderNameId = false;
        }
        else {
            vm.tableHeaderNameId = true;
        }
    }

    function _sortUsersDivisions(tableHeaderName) {
        console.log("sortUsersDivisions");

        vm.sortKeyUsersDivisions = tableHeaderName;

        vm.reverseUsersDivisions = !vm.reverseUsersDivisions;

        if (tableHeaderName != 'id') {
            vm.tableHeaderNameIdDivisions = false;
        }
        else {
            vm.tableHeaderNameIdDivisions = true;
        }
    }

    function _successTeamsSelectTeamsParents(data) {
        vm.teamsRecords = null;

        vm.notify(function () {
            vm.teamsRecords = data.items;
            
            if (data.items && data.items.length > 0) {
                for (var i = 0; i < vm.teamsRecords.length; i++) {
                    if (vm.teamsRecords[i].countUsers < 2) {
                        vm.teamsRecords[i].userLabel = "user";
                    } else {
                        vm.teamsRecords[i].userLabel = "users";
                    }
                }
            }

            if (vm.teamsRecords) {
                vm.showNoTeamsMessage = false;
                vm.showTeamsRecords = true;
            }
            else {
                vm.showNoTeamsMessage = true;
                vm.showTeamsRecords = false;
            }
        });
    }

    function _successTeamsSelectTeamsDivisions(data) {
        vm.teamsRecordsDivisions = null;

        vm.notify(function () {
            vm.teamsRecordsDivisions = data.items;

            if (vm.teamsRecordsDivisions) {
                vm.showTeamsRecordsDivisions = false;
            }
            else {
                vm.showTeamsRecordsDivisions = true;
            }

            vm.loadUsersByTeamsId(vm.teamsId);
        });
    }

    function _errorTeamsSelectTeamsParents(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the Teams records. " + error);
    }

    function _errorTeamsSelectTeamsDivisions(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the Teams records. " + error);
    }

    function _successUsersTeamsSelectUsersByTeamsId(data) {
        vm.loadingUsers = false;

        vm.notify(function () {
            vm.usersRecords = data.items;

            if (vm.usersRecords) {
                vm.showNoUsersMessage = false;
                vm.showUsersRecords = true;
            }
            else {
                if (vm.teamsRecordsDivisions) {
                    console.log(vm.teamsRecordsDivisions);
                    vm.showNoUsersMessage = false;
                    console.log("There are divisions.");
                }
                else {
                vm.showNoUsersMessage = true;
                    console.log("There are no divisions.");
                }

                vm.showUsersRecords = false;
            }
        });
    }

    function _successUsersTeamsSelectUsersByTeamsIdDivisions(data) {
        vm.loadingUsersDivisions = false;

        vm.notify(function () {
            vm.usersRecordsDivisions = data.items;

            console.log(vm.usersRecordsDivisions);

            if (vm.usersRecordsDivisions) {
                vm.showNoUsersMessageDivisions = false;
                vm.showUsersRecordsDivisions = true;
            }
            else {
                vm.showNoUsersMessageDivisions = true;
                vm.showUsersRecordsDivisions = false;
            }
        });
    }

    function _errorUsersTeamsSelectUsersByTeamsId(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the Users records. " + error);
    }

    function _errorUsersTeamsSelectUsersByTeamsIdDivisions(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the Users records. " + error);
    }

    function _openModalTeams(typeAddOrEdit, selectedRecord) {
        var headerText;

        headerText = typeAddOrEdit + " Team";

        var modalInstance = vm.$uibModal.open({
            animation: true

            , templateUrl: "/Scripts/sabio/users/templates/modalTeams.html"
            , windowClass: "modal modal-message fade in modalNg"
            , controller: "modalTeamsController as modalTeamsBoard"
            , resolve: {
                headerText: function () {
                    return headerText;
                },
                selectedRecord: function () {
                    return selectedRecord;
                }
            }
        });

        modalInstance.result.then(function (modalResult) { }
            , function (reason) {
                vm.notify = vm.$teamsService.getNotifier($scope);

                if (reason === "successAdd") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.$notificationsService.success("Successfully added a Team record.");
                }
                else if (reason === "errorAdd") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.$notificationsService.error("Error in adding a Team record. ");
                }
                else if (reason === "successEdit") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.$notificationsService.success("Successfully updated a Team record.");
                }
                else if (reason === "errorEdit") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.$notificationsService.error("Error in updating the Team record. ");
                }
                else if (reason === "cancel") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                }
            }
        );
    }

    function _openModalDivisions(typeAddOrEdit, parentTeamsId, parentTeamsTitle, selectedRecord) {
        var headerText;

        headerText = typeAddOrEdit + " Division";

        parentTeamsId = parentTeamsId;

        parentTeamsTitle = parentTeamsTitle;

        var modalInstance = vm.$uibModal.open({
            animation: true

            , templateUrl: "/Scripts/sabio/users/templates/modalDivisions.html"
            , windowClass: "modal modal-message fade in modalNg"
            , controller: "modalDivisionsController as modalDivisionsBoard"
            , resolve: {
                headerText: function () {
                    return headerText;
                },
                parentTeamsId: function () {
                    return parentTeamsId;
                },
                parentTeamsTitle: function () {
                    return parentTeamsTitle;
                },
                selectedRecord: function () {
                    return selectedRecord;
                }
            }
        });

        modalInstance.result.then(function (modalResult) { }
            , function (reason) {
                vm.notify = vm.$teamsService.getNotifier($scope);

                if (reason === "successAdd") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(parentTeamsId);
                    vm.$notificationsService.success("Successfully added a Division record.");
                }
                else if (reason === "errorAdd") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(parentTeamsId);
                    vm.$notificationsService.error("Error in adding a Division record. ");
                }
                else if (reason === "successEdit") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(parentTeamsId);
                    vm.$notificationsService.success("Successfully updated a Division record.");
                }
                else if (reason === "errorEdit") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(parentTeamsId);
                    vm.$notificationsService.error("Error in updating the Division record. ");
                }
                else if (reason === "cancel") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(parentTeamsId);
                }
            }
        );
    }

    function _openModalUsersAdd(typeAddOrEdit, teamsId, selectedRecord) {
        var headerText;

        headerText = typeAddOrEdit + " User";

        var modalInstance = vm.$uibModal.open({
            animation: true
            , templateUrl: "/Scripts/sabio/users/templates/modalUsersAdd.html"
            , windowClass: "modal modal-message fade in modalNg"
            , controller: "modalUsersAddController as modalUsersAddBoard"
            , resolve: {
                headerText: function () {
                    return headerText;
                },
                teamsId: function () {
                    return teamsId;
                },
                selectedRecord: function () {
                    return selectedRecord;
                }
            }
        });

        modalInstance.result.then(function (modalResult) { }
            , function (reason) {
                vm.notify = vm.$teamsService.getNotifier($scope);

                if (reason === "successAdd") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(vm.teamsId);
                    vm.$notificationsService.success("Successfully added a User record.");
                }
                else if (reason === "errorAdd") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(vm.teamsId);
                    vm.$notificationsService.error("Error in adding a User record. ");
                }
                else if (reason === "cancel") {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(vm.teamsId);
                }
            }
        );
    }

    function _openModalUsersEdit(typeAddOrEdit, teamsId, selectedRecord) {
        var headerText;

        headerText = typeAddOrEdit + " User";

        var modalInstance = vm.$uibModal.open({
            animation: true
            , templateUrl: "/Scripts/sabio/users/templates/modalUsersEdit.html"
            , windowClass: "modal modal-message fade in modalNg"
            , controller: "modalUsersEditController as modalUsersEditBoard"
            , resolve: {
                headerText: function () {
                    return headerText;
                },
                teamsId: function () {
                    return teamsId;
                },
                selectedRecord: function () {
                    return selectedRecord;
                }
                }
        });

        modalInstance.result.then(function (modalResult) { }
            , function (reason) {
                vm.notify = vm.$teamsService.getNotifier($scope);

                if (reason === 'successEdit') {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(vm.teamsId);
                    vm.$notificationsService.success("Successfully updated the User record.");
                }
                else if (reason === 'errorEdit') {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(vm.teamsId);
                    vm.$notificationsService.error("Error in updating the User record. ");
                }
                else if (reason === 'cancel') {
                    vm.loadTabBySubscriptionType(vm.convertToInt(vm.$subscriptionType)); //vm.loadTabByBucketId(vm.$bucketId);
                    vm.expandAccordion(vm.teamsId);
                }
            }
        );
    }

    function _viewTeam(teamsId) {
        setTimeout(function () {
            vm.notify(function () {
                vm.$location.url("/" + vm.$subscriptionType + "/teamDetails/" + teamsId); //vm.$location.url("users/" + vm.$bucketId + "/teamDetails/" + teamsId);
                window.scrollTo(0, 0);
            }, 1000);
        });
    }

    function _viewUser(teamsId, userId) {
        setTimeout(function () {
            vm.notify(function () {
                vm.$location.url("/" + vm.$subscriptionType + "/" + teamsId + "/userDetails/" + userId); //vm.$location.url("users/" + vm.$bucketId + "/" + teamsId + "/userDetails/" + userId);
                window.scrollTo(0, 0);
            }, 1000);
        });
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

    function _userPermissionsOpenSubModal(selectedUser) {

        var selectedUser, selectedTeam;

        var modalInstance = vm.$uibModal.open({
            animation: true,
            templateUrl: '/Scripts/sabio/users/templates/permissionsModal.html',
            windowClass: 'modal modal-message fade in modalNg',
            controller: 'permissionsModalController as userBucketsBoard',
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

    function _addLabel() {
        if (vm.$subscriptionType == "bteam") {
            return "Add Division";
        } else {
            return "Add Company";
        }
    }
}
