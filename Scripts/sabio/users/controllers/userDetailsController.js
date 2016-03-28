(function () {
    "use strict";

    angular.module(APPNAME)
        .controller("userDetailsController", userDetailsController);

    userDetailsController.$inject = ["$scope"
        , "$baseController"
        , "$notificationsService"
        , "$teamsService"
        , "$usersService"
        , "$addressesService"
        , "$routeParams"
        , "$location"
        , "$reportingOutputService"];
})();

function userDetailsController($scope
    , $baseController
    , $notificationsService
    , $teamsService
    , $usersService
    , $addressesService
    , $routeParams
    , $location
    , $reportingOutputService) {

    var vm = this;

    $baseController.merge(vm, $baseController);

    vm.$scope = $scope;
    vm.$location = $location;
    vm.$notificationsService = $notificationsService;
    vm.$teamsService = $teamsService;
    vm.$usersService = $usersService;
    vm.$addressesService = $addressesService;
    vm.$reportingOutputService = $reportingOutputService;

    vm.notify = vm.$teamsService.getNotifier($scope);
    vm.notify = vm.$usersService.getNotifier($scope);
    vm.notify = vm.$addressesService.getNotifier($scope);

    vm.userDetails = null;
    vm.mediaFullUrl = null;
    vm.mediaDescription = null;
    vm.teamsTitle = null;
    vm.address1 = null;
    vm.address2 = null;
    vm.city = null;
    vm.stateProvinceName = null;
    vm.countryRegionCode = null;
    vm.roleOptions = null;

    vm.lineGraphModulus = 0;
    vm.lineGraphForm = null;
    vm.lineGraphDateOne = null;
    vm.lineGraphDateOneResult = null;
    vm.lineGraphDateTwo = null;
    vm.lineGraphDateTwoResult = null;
    vm.lineGraphPer = "day";
    vm.lineGraphPerResult = "day";
    vm.lineGraphTotalHoursResult = 0;
    vm.lineGraphAverageHoursResult = "0";
    vm.lineGraphData = [];
    vm.lineGraphTicks = [];
    vm.singleLineGraphData = [];
    vm.singleLineGraphTick = [];
    vm.lineGraphDateIndex = null;
    vm.lineGraphSeconds = 0;
    vm.lineGraphTotalSeconds = 0;

    vm.controllerAndAction = null;
    vm.controllerAndActionData = null;
    vm.pieGraphForm = null;
    vm.pieGraphDateOne = null;
    vm.pieGraphDateOneResult = null;
    vm.pieGraphDateTwo = null;
    vm.pieGraphDateTwoResult = null;
    vm.pieGraphPer = "day";
    vm.pieGraphPerResult = "day";
    vm.pieGraphSelectedControllerAndAction = "N/A";
    vm.pieGraphSelectedControllerAndActionResult = "N/A";
    vm.pieGraphTotalHours = 0;
    vm.pieGraphAverageHours = "0";
    vm.pieGraphPercentage = 0;
    vm.pieGraphData = [];
    vm.pieGraphSeconds = 0;
    vm.pieGraphSelectedSeconds = 0;
    vm.tempData = [];
    vm.date = null;

    vm.lineGraphLoading = true;
    vm.pieGraphLoading = true;
    //vm.data = [[0, 7], [1, 6], [2, 3]];
    //vm.pieGraphData = [
    //    { label: "Editorial", data: 1, color: "#4572A7" },
    //    { label: "Tags", data: 3, color: "#80699B" }
    //]

    vm.$subscriptionType = $routeParams.subscriptionType; //vm.$bucketId = $routeParams.bucketId;
    vm.$teamsId = $routeParams.teamsId;
    vm.$userId = $routeParams.userId;
    vm.userIdUniqueIdentifier = null;
    vm.stateProvinceId = null;
    vm.roleOptionsLength = null;
    vm.userRolesLength = null;
    
    vm.back = _back;
    vm.successUsersGetUserData = _successUsersGetUserData;
    vm.errorUsersGetUserData = _errorUsersGetUserData;
    vm.successTeamsSelectByTeamsId = _successTeamsSelectByTeamsId
    vm.errorTeamsSelectByTeamsId = _errorTeamsSelectByTeamsId;
    vm.successUsersGetDetailsById = _successUsersGetDetailsById;
    vm.errorUsersGetDetailsById = _errorUsersGetDetailsById;
    vm.successAddressesSelectAllStateProvince = _successAddressesSelectAllStateProvince;
    vm.errorAddressesSelectAllStateProvince = _errorAddressesSelectAllStateProvince;
    vm.successUsersLoadAllRoles = _successUsersLoadAllRoles;
    vm.errorUsersLoadAllRoles = _errorUsersLoadAllRoles;
    vm.successUsersGetUserRoles = _successUsersGetUserRoles;
    vm.errorUsersGetUserRoles = _errorUsersGetUserRoles;

    // ===== Set Up Data =====
    vm.setUpDate = _setUpDate;
    vm.setUpControllerAndAction = _setUpControllerAndAction;
    // ===== Render Line Graph =====
    vm.loadLineGraph = _loadLineGraph;
    vm.renderLineGraph = _renderLineGraph;
    // ===== Render Pie Graph ===== 
    vm.loadPieGraph = _loadPieGraph;
    vm.loadPieGraphContinued = _loadPieGraphContinued;
    vm.renderPieGraph = _renderPieGraph;
    // ===== Event Handlers =====
    vm.onClickLineGraphArrow = _onClickLineGraphArrow;
    vm.onClickPieGraphArrow = _onClickPieGraphArrow;
    // ===== Miscellaneous =====
    vm.onError = _onError;
    vm.findDateDifference = _findDateDifference;
    vm.findAppropriateModulus = _findAppropriateModulus;
    vm.findAverageHours = _findAverageHours;
    vm.findMax = _findMax;
    vm.findRandomColor = _findRandomColor;
    vm.convertDateForCSharp = _convertDateForCSharp;
    vm.convertDateForJs = _convertDateForJs;
    vm.convertSecondsToHours = _convertSecondsToHours;
    vm.matchFormat = _matchFormat;
    vm.capitalizeFirstLetter = _capitalizeFirstLetter;

    renderHTML();

    function renderHTML() {
        // console.log("RenderHTML: userDetails");

        vm.$usersService.getUserData(vm.$userId, vm.successUsersGetUserData, vm.errorUsersGetUserData);

        vm.$teamsService.onTeamsSelectByTeamsId(vm.successTeamsSelectByTeamsId, vm.errorTeamsSelectByTeamsId, vm.$teamsId);
    }

    function _back() {
        console.log("Back");

        setTimeout(function () {
            vm.notify(function () {
                vm.$location.url("/" + vm.$subscriptionType); //vm.$location.url("users/" + vm.$bucketId);
            }, 1000);
        });
    }

    function _successUsersGetUserData(data) {
        vm.notify(function () {
            vm.userDetails = data.items[0];

            if (vm.userDetails.emailVerified == true) {
                vm.userDetails.emailVerified = "Yes";
            }
            else {
                vm.userDetails.emailVerified = "No";
            }

            if (vm.userDetails.administrator == true) {
                vm.userDetails.administrator = "Yes";
            }
            else {
                vm.userDetails.administrator = "No";
            }

            vm.userIdUniqueIdentifier = data.items[0].userID;

            vm.$usersService.getDetailsById(vm.userIdUniqueIdentifier, vm.successUsersGetDetailsById, vm.errorUsersGetDetailsById);

            vm.$usersService.loadAllRoles(vm.successUsersLoadAllRoles, vm.errorUsersLoadAllRoles);

            vm.setUpDate();
        });
    }

    function _errorUsersGetUserData(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the User record. " + error);
    }

    function _successTeamsSelectByTeamsId(data) {
        vm.notify(function () {
            vm.teamsTitle = data.item.title;
        });
    }

    function _errorTeamsSelectByTeamsId(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the Team record. " + error);
    }

    function _successUsersGetDetailsById(data) {
        vm.notify(function () {
            // Media
            if (data.item.userMedia) {
                console.log("Media is available.");

                vm.mediaFullUrl = data.item.userMedia.mediaFullUrl;
                vm.mediaDescription = data.item.userMedia.mediaDescription;
            }
            else {
                console.log("Media is not available.");

                vm.mediaFullUrl = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";
                vm.mediaDescription = "No Image.";
            }

            // Address
            if (data.item.userAddress) {
                console.log("Address is available.");

                vm.address1 = data.item.userAddress.address1;
                vm.address2 = data.item.userAddress.address2;
                vm.city = data.item.userAddress.city;
                vm.stateProvinceId = data.item.userAddress.stateProvinceId;
                vm.countryRegionCode = data.item.userAddress.countryRegionCode;

                vm.$addressesService.selectAllStateProvince(vm.successAddressesSelectAllStateProvince, vm.errorAddressesSelectAllStateProvince);
            }
            else {
                console.log("Address is not available.");
            }
        });
    }

    function _errorUsersGetDetailsById(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the (full) User record. " + error);
    }

    function _successAddressesSelectAllStateProvince(data) {
        vm.notify(function () {
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].stateProvinceId == vm.stateProvinceId) {
                    vm.stateProvinceName = data.items[i].stateProvinceCode;
                }
            }
        });
    }

    function _errorAddressesSelectAllStateProvince(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the State Provice record. " + error);
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
                                    roleSelected: [vm.roleOptions[i]],
                                };
                            }
                        }
                    }
                }
            }
        });
    }

    function _errorUsersGetUserRoles(jqXhr, status, error) {
        vm.$notificationsService.error("Error in loading the User Roles records. " + error);
    }

    // ==================== Set Up Data ====================
    function _setUpDate() {
        var today = new Date();
        vm.date = new Date(today);
        vm.date.setDate(today.getDate() - 1);
        // line graph
        vm.lineGraphDateOne = new Date(today);
        vm.lineGraphDateOne.setDate(today.getDate() - 7);
        vm.lineGraphDateTwo = new Date(vm.date);
        vm.lineGraphDateOneResult = new Date(vm.lineGraphDateOne);
        vm.lineGraphDateTwoResult = new Date(vm.lineGraphDateTwo);
        // pie graph
        vm.pieGraphDateOne = new Date(vm.lineGraphDateOne);
        vm.pieGraphDateTwo = new Date(vm.lineGraphDateTwo);
        vm.pieGraphDateOneResult = new Date(vm.lineGraphDateOne);
        vm.pieGraphDateTwoResult = new Date(vm.lineGraphDateTwo);
        vm.$reportingOutputService.selectAllUniqueControllerAndActionByLayerSource(vm.setUpControllerAndAction, vm.onError, 2);
    }

    function _setUpControllerAndAction(data, status, settings) {
        vm.notify(function () {
            vm.controllerAndAction = data.items;
            vm.pieGraphSelectedControllerAndAction = data.items[0];
            vm.pieGraphSelectedControllerAndActionResult = data.items[0];
        });
        //console.log("select all unique controller and action by layer source success", data.items);
        vm.$reportingOutputService.selectByDateAndUserIdAndRangeReportingUserTime
            (vm.loadLineGraph, vm.onError, vm.convertDateForCSharp(vm.lineGraphDateOne), vm.userIdUniqueIdentifier,
            vm.findDateDifference(vm.lineGraphDateOne, vm.lineGraphDateTwo));
        //console.log("date", vm.convertDateForCSharp(vm.lineGraphDateOne));
        //console.log("date difference", vm.findDateDifference(vm.lineGraphDateOne, vm.lineGraphDateTwo));
        vm.lineGraphModulus = vm.findAppropriateModulus(vm.findDateDifference(vm.lineGraphDateOne, vm.lineGraphDateTwo));
        vm.$reportingOutputService.selectAllUniqueControllerAndActionByDateAndUserIdAndRangeReportingUserControllerAndActionTime
            (vm.loadPieGraph, vm.onError, vm.convertDateForCSharp(vm.pieGraphDateOne), vm.userIdUniqueIdentifier,
            vm.findDateDifference(vm.pieGraphDateOne, vm.pieGraphDateTwo));
    }

    // ==================== Line Graph ====================
    function _loadLineGraph(data, status, settings) {
        //console.log("line graph data.items", data.items);
        vm.notify(function () {
            vm.lineGraphData = [];
            vm.lineGraphTicks = [];
            vm.singleLineGraphData = [];
            vm.singleLineGraphTick = [];
            vm.lineGraphSeconds = 0;
            vm.lineGraphTotalSeconds = 0;
            vm.lineGraphDateIndex = null;
            vm.lineGraphDateIndex = new Date(vm.lineGraphDateOne);
            vm.lineGraphDateOneResult = new Date(vm.lineGraphDateIndex);
            vm.lineGraphDateOneResult = vm.convertDateForCSharp(vm.lineGraphDateOneResult);
            for (var y = 0; y < vm.findDateDifference(vm.lineGraphDateOne, vm.lineGraphDateTwo) + 1; y++) {
                vm.lineGraphSeconds = 0;
                vm.singleLineGraphData = [];
                vm.singleLineGraphTick = [];
                vm.singleLineGraphData.push(y);
                vm.singleLineGraphTick.push(y);
                if (data.items && data.items.length > 0) {
                    for (var x = 0; x < data.items.length; x++) {
                        if (vm.convertDateForCSharp(vm.lineGraphDateIndex) == vm.convertDateForJs(data.items[x].date)) {
                            vm.lineGraphSeconds += data.items[x].seconds;
                        }
                    }
                }
                vm.lineGraphTotalSeconds += vm.lineGraphSeconds;
                vm.singleLineGraphData.push(vm.convertSecondsToHours(vm.lineGraphSeconds));
                if (y % vm.lineGraphModulus == 0) {
                    vm.singleLineGraphTick.push(vm.convertDateForCSharp(vm.lineGraphDateIndex));
                } else {
                    vm.singleLineGraphTick.push(" ");
                }
                vm.lineGraphData.push(vm.singleLineGraphData);
                vm.lineGraphTicks.push(vm.singleLineGraphTick);
                vm.lineGraphDateIndex.setDate(vm.lineGraphDateIndex.getDate() + 1);
            }
            //console.log("line graph data", vm.lineGraphData);
            //console.log("line graph ticks", vm.lineGraphTicks);
            vm.lineGraphDateTwoResult = new Date(vm.lineGraphDateIndex);
            vm.lineGraphDateTwoResult.setDate(vm.lineGraphDateTwoResult.getDate() - 1);
            vm.lineGraphPerResult = vm.lineGraphPer;
            vm.lineGraphTotalHoursResult = vm.convertSecondsToHours(vm.lineGraphTotalSeconds);
            var a = new Date(vm.lineGraphDateOneResult);
            var b = new Date(vm.lineGraphDateTwoResult);
            vm.lineGraphAverageHoursResult = vm.findAverageHours(vm.lineGraphTotalHoursResult, vm.lineGraphPerResult, vm.findDateDifference(a, b));

            vm.renderLineGraph();
        });
    }

    function _renderLineGraph() {
        vm.lineGraphLoading = false;
        $.plot($(".lineGraph"), [vm.lineGraphData], {
            series: {
                lines: {
                    show: true
                }
            },
            xaxis: {
                ticks: vm.lineGraphTicks
            },
        });
        var xaxisLabel = $("<div class='axisLabel xaxisLabel'></div>").text("Date").appendTo($('.lineGraph'));
        var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>").text("Time (Hours)").appendTo($('.lineGraph'));
    }

    // ==================== Pie Graph ====================
    function _loadPieGraph(data, status, settings) {
        //console.log("select all unique controller and action success", data.items);                    
        vm.notify(function () {
            vm.controllerAndActionData = data.items;
        });
        vm.$reportingOutputService.selectByDateAndUserIdAndRangeReportingUserControllerAndActionTime
            (vm.loadPieGraphContinued, vm.onError, vm.convertDateForCSharp(vm.pieGraphDateOne), vm.userIdUniqueIdentifier,
            vm.findDateDifference(vm.pieGraphDateOne, vm.pieGraphDateTwo));
    }

    function _loadPieGraphContinued(data, status, settings) {
        //console.log("select by date and user id and range reporting user controller and action time success", data.items);
        vm.notify(function () {
            //console.log("unique controller and action ", vm.controllerAndActionData);
            vm.pieGraphSelectedControllerAndActionResult = vm.matchFormat(vm.pieGraphSelectedControllerAndAction);
            //console.log("selected controller and action result", vm.pieGraphSelectedControllerAndActionResult);
            //console.log("selected controlelr and aciton", vm.pieGraphSelectedControllerAndAction);
            vm.pieGraphPerResult = vm.pieGraphPer;
            vm.pieGraphDateOneResult = new Date(vm.pieGraphDateOne);
            vm.pieGraphDateTwoResult = new Date(vm.pieGraphDateTwo);
            vm.pieGraphSelectedSeconds = 0;
            vm.tempData = [];
            vm.pieGraphSeconds = 0;
            if (data.items && data.items.length > 0) {
                for (var v = 0; v < vm.controllerAndActionData.length; v++) {
                    vm.pieGraphSeconds = 0;
                    for (var u = 0; u < data.items.length; u++) {
                        if (vm.matchFormat(vm.controllerAndActionData[v]) == vm.matchFormat(data.items[u].controllerAndAction)) {
                            vm.pieGraphSeconds += data.items[u].seconds;
                        }
                    }
                    var t = {};
                    t.label = vm.matchFormat(vm.controllerAndActionData[v]);
                    t.data = vm.pieGraphSeconds;
                    t.color = vm.findRandomColor();
                    vm.tempData.push(t);
                }
                var totalSeconds = 0;
                for (var q = 0; q < vm.tempData.length; q++) {
                    //console.log("data", vm.tempData[q].data);
                    if (vm.matchFormat(vm.tempData[q].label) == vm.matchFormat(vm.pieGraphSelectedControllerAndActionResult)) {
                        vm.pieGraphSelectedSeconds = vm.tempData[q].data;
                    }
                    totalSeconds += vm.tempData[q].data;
                }
                vm.pieGraphTotalHours = vm.convertSecondsToHours(vm.pieGraphSelectedSeconds);
                vm.pieGraphPercentage = Math.round(vm.pieGraphSelectedSeconds / totalSeconds * 100 * 10) / 10;
                //console.log("temp data", vm.tempData);
                //console.log("total hours", vm.pieGraphTotalHours);
                var a = new Date(vm.pieGraphDateOneResult);
                var b = new Date(vm.pieGraphDateTwoResult);
                vm.pieGraphAverageHours = vm.findAverageHours(vm.pieGraphTotalHours, vm.pieGraphPerResult, vm.findDateDifference(a, b));
                vm.pieGraphData = [];
                var numOfLoops = 10;
                if (vm.tempData.length < 10) {
                    numOfLoops = vm.tempData.length;
                }
                for (var num = 0; num < numOfLoops; num++) {
                    if (vm.tempData != null) {
                        var m = vm.findMax(vm.tempData);
                        vm.pieGraphData.push(vm.tempData[m]);
                        vm.tempData.splice(m, 1);
                        m = 0;
                    }
                }
                //console.log("pie data", vm.pieGraphData);
                var otherSeconds = 0;
                for (var number = 0; number < vm.tempData.length; number++) {
                    otherSeconds += vm.tempData[number].data;
                }
                var other = {};
                other.label = "Other";
                other.data = otherSeconds;
                other.color = vm.findRandomColor();
                vm.pieGraphData.push(other);
            } else {
                vm.pieGraphData = [{ label: "No Data Available", data: 1, color: vm.findRandomColor() }];
            }

            vm.renderPieGraph();

        });
    }

    function _renderPieGraph() {
        vm.pieGraphLoading = false;
        $.plot($(".pieGraph"), vm.pieGraphData, {
            series: {
                pie: {
                    show: true
                }
            }
        });
    }

    // ==================== Event Handlers ====================
    function _onClickLineGraphArrow() {
        if (vm.lineGraphForm.$valid) {
            if (vm.lineGraphDateOne.getTime() > vm.lineGraphDateTwo.getTime() || vm.lineGraphDateTwo.getTime() > vm.date.getTime()) {
                $notificationsService.warning("Please select dates appropriately.");
            } else {
                vm.$reportingOutputService.selectByDateAndUserIdAndRangeReportingUserTime(vm.loadLineGraph, vm.onError,
                vm.convertDateForCSharp(vm.lineGraphDateOne), vm.userIdUniqueIdentifier, vm.findDateDifference(vm.lineGraphDateOne, vm.lineGraphDateTwo));
                vm.lineGraphModulus = vm.findAppropriateModulus(vm.findDateDifference(vm.lineGraphDateOne, vm.lineGraphDateTwo));
            }
        } else {
            $notificationsService.warning("Please select dates appropriately.");
        }
    }

    function _onClickPieGraphArrow() {
        //console.log("pie graph selected user", vm.pieGraphSelectedUser);
        if (vm.pieGraphForm.$valid) {
            if (vm.pieGraphDateOne.getTime() > vm.pieGraphDateTwo.getTime() || vm.pieGraphDateTwo.getTime() > vm.date.getTime()) {
                $notificationsService.warning("Please select dates appropriately.");
            } else {
                vm.$reportingOutputService.selectAllUniqueControllerAndActionByDateAndUserIdAndRangeReportingUserControllerAndActionTime
                (vm.loadPieGraph, vm.onError, vm.convertDateForCSharp(vm.pieGraphDateOne), vm.userIdUniqueIdentifier,
                vm.findDateDifference(vm.pieGraphDateOne, vm.pieGraphDateTwo));
            }
        } else {
            $notificationsService.warning("Please select dates appropriately.");
        }
    }

    // ==================== Miscellaneous ====================
    function _onError(ajax, status, errorThrown) {
        $notificationsService.error("error: " + errorThrown);
        //console.log("error ajax: ", ajax);
        //console.log("error status: ", status);
        //console.log("error thrown: ", errorThrown);
    }

    function _findDateDifference(a, b) {
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    function _findAppropriateModulus(x) {
        var mod = 1;
        if (x < 10) {
            mod = 1;
        } else {
            mod = Math.round(x/7);
        }
        return mod
    }

    function _findAverageHours(h, per, range) {
        var avg = 0;
        range = range + 1;
        if (range == 0 && per == "day") {
            avg = h;
        } else if (range < 6 && (per == "week" || per == "month")) {
            avg = avg.toString();
            avg = "N/A";
        } else if (range < 28 && per == "month" ) {
            avg = avg.toString();
            avg = "N/A";
        } else {
            switch(per) {
                case "day":
                    avg = h / range;
                    break;
                case "week":
                    avg = h / range * 7;
                    break;
                case "month":
                    avg = h / range * 30;
                    break;
            }
            avg = Math.round(avg * 10) / 10;
            avg = avg.toString();
        }
        return avg;
    }

    function _convertDateForCSharp(date) {
        var d = new Date(date);
        var dd = d.getDate();
        var mm = d.getMonth() + 1; //January is 0!
        var yyyy = d.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        d = mm + '/' + dd + '/' + yyyy;
        return d;
    }

    function _convertDateForJs(d) {
        d = d.slice(0, 10);
        var mm = d.slice(5, 7);
        var dd = d.slice(8, 10);
        var yyyy = d.slice(0, 4);
        d = mm + "/" + dd + "/" + yyyy;
        return d;
    }

    function _convertSecondsToHours(seconds) {
        var hours = Math.round(seconds / 3600 * 10) / 10;
        return hours;
    }
         
    function _findRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function _findMax(array) {
        var max = array[0].data;
        var maxIndex = 0;
        var a = {};
        for (var i = 0; i < array.length; i++) {
            if (max < array[i].data) {
                a = array[i];
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    function _matchFormat(s) {
        if (s && s.length > 0) {
            var first = s.substring(0, s.indexOf("|"));
            first = vm.capitalizeFirstLetter(first);
            var second = s.substring(s.indexOf("|") + 1, s.length);
            second = vm.capitalizeFirstLetter(second);
            return first + "|" + second;
        }
        return "";
    }

    function _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
