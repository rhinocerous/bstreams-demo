(function () {
    "use strict"

    angular.module(APPNAME)
        .controller("indexController", indexController);

    indexController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$usersService"
        , "$subscriptionsService"
        , '$routeParams'
        , "$location"
        , "$uibModal"];
})();

function indexController($scope
    , $baseController
    , $notificationsService
    , $usersService
    , $subscriptionsService
    , $routeParams
    , $location
    , $uibModal) {

    var vm = this;

    $baseController.merge(vm, $baseController);

    vm.$scope = $scope;
    vm.$notificationsService = $notificationsService;
    vm.$usersService = $usersService;
    vm.$location = $location;
    vm.$uibModal = $uibModal;
    vm.$scope.parseInt = parseInt;

    vm.notify = vm.$usersService.getNotifier($scope);

    vm.formSearch = null;
    vm.inputFormSearch = {};
    vm.tableHeaderNameId = true;
    vm.hidePagination = false;
    vm.hideSearchResultsInfo = false;
    vm.sortKey = null;
    vm.reverse = false;
    vm.usersRecords = {};
    vm.totalUsersRecordsShown = 0;
    vm.totalUsersRecords = null;

    vm.search = _search;
    vm.convertDateParameter = _convertDateParameter;
    vm.changeDateParameterFilter = _changeDateParameterFilter;
    vm.sort = _sort;
    vm.firstPage = _firstPage;
    vm.previousPage = _previousPage;
    vm.getPage = _getPage;
    vm.nextPage = _nextPage;
    vm.lastPage = _lastPage;
    vm.activePageClass = _activePageClass;

    vm.pageLoadCheck = false;
    vm.totalUsersOnPageLoad = 0;
    vm.pages = [];
    vm.totalPageNumbers = 0;
    vm.initialPageCount = 0;
    vm.initialPageIndex = 0;
    vm.limitPageNumbers = 0;
    vm.selectedPage = null;
    vm.dateParameterConverted = null;
    vm.source = null;
    //vm.$bucketId = $routeParams.bucketId;

    vm.reloadTable = _reloadTable;
    vm.sortTable = _sortTable;
    vm.generatePagination = _generatePagination;

    vm.successUsersGetUsersByParams = _successUsersGetUsersByParams;
    vm.errorUsersGetUsersByParams = _errorUsersGetUsersByParams;
    vm.successUsersGetUsersByParamsRange = _successUsersGetUsersByParamsRange;
    vm.errorUsersGetUsersByParamsRange = _errorUsersGetUsersByParamsRange;

    vm.openModalUsersEdit = _openModalUsersEdit;
    vm.viewUser = _viewUser;
    vm.userOpenSubModal = _userOpenSubModal;

    renderHTML();

    function renderHTML() {
        vm.inputFormSearch = {
            currentPage: "1",
            itemsPerPage: "20",
            columnName: "id",
            direction: "asc"
        };

        console.log(vm.inputFormSearch);

        vm.dateParameterFilter = "DateExact";

        vm.limitPageNumbers = 9;

        vm.pageLoadCheck = true;
        vm.pages = [];
        vm.disablePreviousButton = true;

        vm.source = "search";

        vm.$usersService.getUsersByParams(vm.inputFormSearch, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
    }

    function _successUsersGetUsersByParams(data) {
        vm.notify(function () {
            if (vm.source == "search" || vm.source == "sort")
            {
                if (vm.source == "search") {
                    console.log("search");
                }
                else {
                    console.log("sort");
                }

                vm.pages = [];

                if (data.items) {
                    if (vm.pageLoadCheck) {
                        vm.totalUsersOnPageLoad = data.items[0].overallCount;
                        vm.pageLoadCheck = false;
                    }

                    vm.showNoRecordsMessage = false;
                    vm.showUsersRecords = true;
                    vm.hideSearchResultsInfo = false;

                    vm.usersRecords = data.items;
                    console.log(vm.usersRecords);

                    vm.totalUsersRecordsShown = data.items.length;

                    console.log("vm.totalUsersRecordsShown : " + vm.totalUsersRecordsShown);

                    vm.totalUsersRecords = data.items[0].overallCount;

                    vm.totalPageNumbers = Math.ceil(vm.totalUsersRecords / vm.inputFormSearch.itemsPerPage);

                    vm.initialPageCount = 1;

                    vm.generatePagination();

                    if (vm.totalPageNumbers == 1 || vm.inputFormSearch.itemsPerPage == "All") {
                        vm.hidePagination = true;
                    }
                    else {
                        vm.hidePagination = false;
                    }

                    vm.selectedPage = vm.pages[0];
                    vm.activePageClass(vm.selectedPage);
                }
                else {
                    vm.totalUsersRecordsShown = 0;
                    vm.showUsersRecords = false;
                    vm.showNoRecordsMessage = true;
                    vm.hideSearchResultsInfo = true;
                    vm.hidePagination = true;
                }
            }
            else if (vm.source == "pagination") {
                console.log("pagination");

                vm.usersRecords = data.items;
                console.log(vm.usersRecords);

                vm.totalUsersRecordsShown = data.items.length;
                console.log("vm.totalUsersRecordsShown : " + vm.totalUsersRecordsShown);
            }
            else {
                console.log("error");
            }
        });
    }

    function _errorUsersGetUsersByParams(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the User records. " + error);
    }

    function _successUsersGetUsersByParamsRange(data) {
        vm.notify(function () {
            if (vm.source == "search" || vm.source == "sort") {
                if (vm.source == "search") {
                    console.log("search");
                }
                else {
                    console.log("sort");
                }

                vm.pages = [];

                if (data.items) {
                    vm.showNoRecordsMessage = false;
                    vm.showUsersRecords = true;
                    vm.hideSearchResultsInfo = false;

                    vm.usersRecords = data.items;
                    console.log(vm.usersRecords);

                    vm.totalUsersRecordsShown = data.items.length;

                    console.log("vm.totalUsersRecordsShown : " + vm.totalUsersRecordsShown);

                    vm.totalUsersRecords = data.items[0].overallCount;

                    vm.totalPageNumbers = Math.ceil(vm.totalUsersRecords / vm.inputFormSearch.itemsPerPage);

                    for (var i = 1; i <= vm.totalPageNumbers; i++) {
                        var obj = {
                            "value": i
                        };

                        vm.pages.push(obj);
                    }

                    if (vm.totalPageNumbers == 1 || vm.inputFormSearch.itemsPerPage == "All") {
                        vm.hidePagination = true;
                    }
                    else {
                        vm.hidePagination = false;
                    }

                    vm.selectedPage = vm.pages[0];
                    vm.activePageClass(vm.selectedPage);
                }
                else {
                    vm.totalUsersRecordsShown = 0;
                    vm.showUsersRecords = false;
                    vm.showNoRecordsMessage = true;
                    vm.hideSearchResultsInfo = true;
                    vm.hidePagination = true;
                }
            }
            else if (vm.source == "pagination") {
                console.log("pagination");

                vm.usersRecords = data.items;
                console.log(vm.usersRecords);

                vm.totalUsersRecordsShown = data.items.length;
                console.log("vm.totalUsersRecordsShown : " + vm.totalUsersRecordsShown);
            }
            else {
                console.log("error");
            }
        });
    }

    function _errorUsersGetUsersByParamsRange(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the User records by range. " + error);
    }

    function _search() {
        vm.source = "search";

        vm.reloadTable();
    }

    function _convertDateParameter(dateParameter) {
        console.log(dateParameter);

        vm.dateParameterConverted = null;

        if (dateParameter == undefined) {
            vm.dateParameterConverted = null;

            vm.reloadTable();
        }
        else {
            var d = new Date(dateParameter);
            var dd = d.getDate();
            var mm = d.getMonth() + 1; //January is 0!
            var yyyy = d.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }

            vm.dateParameterConverted = mm + '/' + dd + '/' + yyyy;

            console.log(vm.dateParameterConverted);

            vm.reloadTable();
        }
    }

    function _changeDateParameterFilter() {
        vm.inputFormSearch.currentPage = "1";

        vm.search();
    }

    function _getPage(page) {
        vm.source = "pagination";

        if (vm.selectedPage == vm.pages[0]) {
            vm.disablePreviousButton = true;
        }
        else {
            vm.disablePreviousButton = false;
        }

        if (vm.selectedPage == vm.pages[vm.totalPageNumbers - 1]) {
            vm.disableNextButton = true;
        }
        else {
            vm.disableNextButton = false;
        }

        if (page.value === "...") {
            console.log("...");

            console.log("Pages length: " + vm.pages[vm.pages.length - 3].value);

            vm.initialPageCount = (vm.pages[vm.pages.length - 3].value) + 1;

            vm.pages = [];

            vm.generatePagination();
        }
        else {
            console.log("Not '...'");

            vm.inputFormSearch.currentPage = page.value;

            vm.selectedPage = page;

            vm.sortTable();
        }
    }

    function _previousPage() {
        if (vm.selectedPage == vm.pages[0]) {
            vm.disablePreviousButton = true;
        }
        else {
            vm.getPage(vm.pages[(parseInt(vm.inputFormSearch.currentPage) - 1) - 1]);
        }
    }

    function _nextPage() {
        if (vm.selectedPage == vm.pages[vm.totalPageNumbers - 1]) {
            vm.disableNextButton = true;
        }
        else {
            vm.getPage(vm.pages[parseInt(vm.inputFormSearch.currentPage)]);
        }
    }

    function _firstPage() {
        vm.getPage(vm.pages[0]);
    }

    function _lastPage() {
        vm.getPage(vm.pages[vm.totalPageNumbers - 1]);
    }

    function _activePageClass(page) {
        if (vm.selectedPage.value == "...") {
            return "disabled";
        }
        else if (vm.selectedPage == page && !(vm.selectedPage.value == "...")) {
            return "active";
        }
        else {
            return "";
        }
    }

    function _sort(tableHeaderName) {
        vm.source = "sort";

        vm.sortKey = tableHeaderName;

        vm.inputFormSearch.currentPage = "1";
        vm.inputFormSearch.columnName = tableHeaderName;

        if (vm.reverse) {
            vm.inputFormSearch.direction = "asc";
        }
        else {
            vm.inputFormSearch.direction = "desc";
        }

        console.log(vm.inputFormSearch);

        vm.reverse = !vm.reverse;

        if (tableHeaderName == 'id') {
            vm.tableHeaderNameId = true;
        }
        else {
            vm.tableHeaderNameId = false;
        }

        vm.sortTable();
    }

    function _generatePagination() {
        vm.initialPageIndex = 1;

        for (var i = vm.initialPageCount; i <= vm.totalPageNumbers; i++) {
            if (vm.initialPageIndex < vm.limitPageNumbers) {
                var obj = {
                    "value": i
                };

                vm.pages.push(obj);
            }
            else if (vm.initialPageIndex == vm.limitPageNumbers) {
                console.log("pagination limit reached");

                var obj = {
                    "value": "..."
                };

                vm.pages.push(obj);

                vm.disableEllipsesButton = true;

                var obj = {
                    "value": vm.totalPageNumbers
                };

                vm.pages.push(obj);

                break;
            }

            vm.initialPageIndex++;
        }
    }

    function _reloadTable() {
        if (vm.dateParameterFilter == "DateExact") {
            console.log("ReloadTable - DateExact");

            if (vm.inputFormSearch.itemsPerPage == "All") {
                vm.inputFormSearch.currentPage = "1";

                if (vm.inputFormSearch.searchParameter == "") {
                    vm.inputFormSearch.searchParameter = null;
                }

                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: "id",
                        direction: "asc"
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: "id",
                        direction: "asc"
                    }
                    console.log(myData);

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
            }
            else {
                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: "id",
                        direction: "asc"
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: "id",
                        direction: "asc"
                    }

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
            }
        }
        else {
            console.log("ReloadTable - DateRange");

            if (vm.inputFormSearch.itemsPerPage == "All") {
                vm.inputFormSearch.currentPage = "1";

                if (vm.inputFormSearch.searchParameter == "") {
                    vm.inputFormSearch.searchParameter = null;
                }

                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: "id",
                        direction: "asc"
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: "id",
                        direction: "asc"
                    }
                    console.log(myData);

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
            }
            else {
                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: "id",
                        direction: "asc"
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: "id",
                        direction: "asc"
                    }

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
            }
        }
    }

    function _sortTable() {
        if (vm.dateParameterFilter == "DateExact") {
            console.log("ReloadTable - DateExact");

            if (vm.inputFormSearch.itemsPerPage == "All") {
                vm.inputFormSearch.currentPage = "1";

                if (vm.inputFormSearch.searchParameter == "") {
                    vm.inputFormSearch.searchParameter = null;
                }

                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }
                    console.log(myData);

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
            }
            else {
                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }

                    vm.$usersService.getUsersByParams(myData, vm.successUsersGetUsersByParams, vm.errorUsersGetUsersByParams);
                }
            }
        }
        else {
            console.log("ReloadTable - DateRange");

            if (vm.inputFormSearch.itemsPerPage == "All") {
                vm.inputFormSearch.currentPage = "1";

                if (vm.inputFormSearch.searchParameter == "") {
                    vm.inputFormSearch.searchParameter = null;
                }

                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.totalUsersOnPageLoad,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }
                    console.log(myData);

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
            }
            else {
                if (vm.dateParameterConverted) {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.dateParameterConverted,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }

                    console.log(myData);

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
                else {
                    var myData = {
                        searchParameter: vm.inputFormSearch.searchParameter,
                        dateParameter: vm.inputFormSearch.dateParameter,
                        currentPage: vm.inputFormSearch.currentPage,
                        itemsPerPage: vm.inputFormSearch.itemsPerPage,
                        columnName: vm.inputFormSearch.columnName,
                        direction: vm.inputFormSearch.direction
                    }

                    vm.$usersService.getUsersByParamsRange(myData, vm.successUsersGetUsersByParamsRange, vm.errorUsersGetUsersByParamsRange);
                }
            }
        }
    }

    function _openModalUsersEdit(typeAddOrEdit, selectedRecord) {
        console.log(_openModalUsersEdit);

        var headerText;

        switch (typeAddOrEdit) {
            case 'Add':
                headerText = typeAddOrEdit + " User"
                break;
            case 'Edit':
                headerText = typeAddOrEdit + " User"
                break;
        }

        var modalInstance = vm.$uibModal.open({
            animation: true
            , templateUrl: "/Scripts/sabio/users/templates/modalUsersEdit.html"
            , windowClass: "modal modal-message fade in modalNg"
            , controller: "modalUsersController as modalUsersBoard"
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
                vm.notify = vm.$usersService.getNotifier($scope);

                if (reason === 'successEdit') {

                }
                else if (reason === 'errorEdit') {
                    console.log("errorEdit");
                }
                else if (reason === 'cancel') {
                    console.log("cancel");
                }
            }
        );
    }

    function _viewUser(teamsId, userId) {
        //console.log(vm.$bucketId);
        setTimeout(function () {
            vm.notify(function () {
                vm.$location.url("/" + "usersearch" + "/" + teamsId + "/userDetails/" + userId);
                window.scrollTo(0, 0);
            }, 1000);
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
}