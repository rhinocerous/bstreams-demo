//**angular services:

//address service:
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$addressesService', addressesServiceFactory);

    addressesServiceFactory.$inject = ['$baseService', '$sabio'];

    function addressesServiceFactory($baseService, $sabio) {
        var aSabioServiceObj = sabio.services.addresses;

        var newService = $baseService.merge(true, {}, aSabioServiceObj, $baseService);

        return newService;
    }
})();

//notification service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$notificationsService', notificationsServiceFactory);

    notificationsServiceFactory.$inject = ['$baseService', '$sabio'];

    function notificationsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.notifications;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();

//**Controller:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('manageAddressController', ManageAddressController);

    ManageAddressController.$inject = ['$scope', '$baseController', '$routeParams', '$location', '$addressesService', '$notificationsService'];

    function ManageAddressController(
        $scope,
        $baseController,
        $routeParams,
        $location,
        $addressesService,
        $notificationsService) {

        var vm = this;
        vm.$scope = $scope;
        vm.$location = $location;
        vm.$addressesService = $addressesService;
        vm.$notificationsService = $notificationsService;

        $baseController.merge(vm, $baseController);
        vm.notify = vm.$addressesService.getNotifier($scope);
        console.log("I'm in the AddressController");

        vm.$teamsId = $routeParams.teamsId;
        vm.showAddressErrors = false;
        vm.currentAddress = null;
        vm.teamIdCheck = null;
        vm.stateProvinceId = null;
        vm.addressForm = null;

        vm.submitAddressForm = _submitAddressForm;

        //success&error handlers declarations:
        vm.successAddressesSelectByTeamsId = _successAddressesSelectByTeamsId;
        vm.errorAddressesSelectByTeamsId = _errorAddressesSelectByTeamsId;
        vm.successSelectAllStateProvinceInsert = _successSelectAllStateProvinceInsert;
        vm.errorSelectAllStateProvince = _errorSelectAllStateProvince;
        vm.successAddressInsert = _successAddressInsert;
        vm.errorAddressInsert = _errorAddressInsert;
        vm.successAddressUpdate = _successAddressUpdate;
        vm.errorAddressUpdate = _errorAddressUpdate;

        //grab address by teamID:
        renderAddress();

        function renderAddress() {
            console.log(vm.$teamsId);
            vm.$addressesService.onAddressesSelectByTeamsId(vm.successAddressesSelectByTeamsId, vm.errorAddressesSelectByTeamsId, vm.$teamsId);
        }

        //success&&error handlers for get address by teamsId:
        function _successAddressesSelectByTeamsId(data) {

            console.log("grab address by ID success handler:", data.items);
            if (data.items == null) {

                //there is no address at the moment:
                vm.teamIdCheck = false;

                vm.$notificationsService.warning("Did not find an address based off the TeamsID--You are in CREATE mode");
                vm.$addressesService.selectAllStateProvince(vm.successSelectAllStateProvinceInsert, vm.errorSelectAllStateProvince);
            }
            else {
                vm.$notificationsService.success("Found an address based off the TeamsId. You are in EDIT mode");
                vm.$addressesService.selectAllStateProvince(vm.successSelectAllStateProvinceInsert, vm.errorSelectAllStateProvince);

                //this is an address + giving the currentAddress.teamsId the correct value:
                vm.teamIdCheck = true;

                //giving vm.currentAddress its values so it can load on the ng-models
                vm.currentAddress = data.items[0];
                console.log(vm.currentAddress);
            }
        }

        function _errorAddressesSelectByTeamsId(error) {
            vm.$notificationsService.error("Error in inserting a Teams record.");
            console.log(error);
        }

        //success&&error handlers for getting states and province dropdown:
        function _successSelectAllStateProvinceInsert(data) {
            vm.notify(function () {
                vm.stateProvinceId = data.items;
            });
            console.log(vm.stateProvinceId);
            console.log(vm.teamIdCheck, "from the success selectAllStateProvince");
        }

        function _errorSelectAllStateProvince(error) {
            vm.$notificationsService.error("Error in getting states&provinces.");
            console.log(error);
        }


        //on ng-submit:
        function _submitAddressForm() {
            vm.showAddressErrors = true;
            if (vm.addressForm.$valid) {
                console.log(vm.currentAddress);
                if (vm.teamIdCheck == false) {
                    //updating teamId before inserting it into the 'insert' function below:
                    vm.currentAddress.teamsId = vm.$teamsId;
                    console.log(vm.currentAddress.teamsId);
                    console.log(vm.currentAddress);
                    vm.$addressesService.insert(vm.successAddressInsert, vm.errorAddressInsert, vm.currentAddress);
                } else if (vm.teamIdCheck == true) {
                    console.log(vm.currentAddress);
                    console.log(vm.$teamsId);
                    vm.$addressesService.onAddressesUpdateByTeamsId(vm.successAddressUpdate, vm.errorAddressUpdate, vm.currentAddress);
                }
            }
            else {
                vm.$notificationsService.error("Please fill out all required fields.");
            }

        }

        //success&&error handlers for inserting address:
        function _successAddressInsert() {
            console.log("From success Adddress Insert", vm.teamIdCheck);
            vm.$notificationsService.success("Successfully added in new address!");
            vm.teamIdCheck = true; //"true", so user can continue to update this address for the the current teamID if they need to
            vm.showAddressErrors = false;
        }

        function _errorAddressInsert(error) {
            vm.$notificationsService.error("Unable to save your new address.");
            console.log(error);
        }

        //success&&error handlers for updating address:
        function _successAddressUpdate() {
            console.log(vm.teamIdCheck, "from success address update");
            vm.$notificationsService.success("Successfully updated address!");
            vm.showAddressErrors = false;
        }

        function _errorAddressUpdate(error) {
            vm.$notificationsService.error("Unable to save your changes.");
            console.log(error);
        }

    }
})();