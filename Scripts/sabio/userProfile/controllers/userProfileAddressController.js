//angular controller:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('userProfileAddressController', userProfileAddressController);

    userProfileAddressController.$inject = ['$scope', '$baseController', '$addressesService', '$routeParams', '$location'];

    function userProfileAddressController(
        $scope
        , $baseController
        , $addressesService
        , $routeParams
        , $location) {

        var vm = this;
        vm.items = null;
        vm.listOfStatesAndProvinces = null;
        vm.showEditAddressErrors = false;
        vm.editAddress = null;
        vm.addressForm = null;
        vm.addressId = null;
        vm.statesAndProvinces = [];


        var hyperlinks = [
            {
                "text": "Edit Address",
                "link": "#/address"
            }
        ];

        sabio.services.breadcrumbs.onSetBreadcrumbs(hyperlinks);

        vm.$routeParams = $routeParams;                
        vm.$location = $location;
        vm.$addressesService = $addressesService; //Defining: get access to sabio.services.addresses
        vm.$scope = $scope;

        vm.getStatesAndProvinces = _getStatesAndProvinces;      //grabs all states&provinces
        vm.StatesAndProvinceSuccess = _getAllStatesAndProvincesSuccess;     //success handler
        vm.getAddressById = _getAddressById;                    //gets address model
        vm.getAddressByIdSuccess = _getAddressByIdSuccess;      //success handler for getting a single address model
        vm.addressError = _addressError;                        //error handler for everything
        vm.updateAddress = _updateAddress;                      //send updates/changes to db
        vm.updateAddressSuccess = _updateAddressSuccess;        //success handler for updating that address model

        //not too sure:
        $baseController.merge(vm, $baseController);
        vm.notify = vm.$addressesService.getNotifier($scope);

        //pull up the right address model by ID:
        vm.getAddressById();

        //defining a function to get address by ID:
        function _getAddressById() {
            vm.$addressesService.selectAddressById(vm.getAddressByIdSuccess, vm.addressError, vm.addressId);
        }

        //success handler to fire when address model loads up successfully:
        function _getAddressByIdSuccess(data) {
            vm.notify(function () {
                vm.editAddress = data.items[0]; //grabbing only the object that contains the data we need (address1, city and etc.)
            });
            console.log(vm.editAddress);
            console.log(vm.editAddress.stateProvinceId);
            console.log("ready to capture all your changes!");
        }

        //getting all the states/province for the dropdown:
        vm.getStatesAndProvinces();

        //defining function to get states and provinces for dropdown list:
        function _getStatesAndProvinces() {
            vm.$addressesService.selectAllStateProvince(vm.StatesAndProvinceSuccess, vm.addressError);
        }

        //success handler for "getStatesAndProvinces" function:
        function _getAllStatesAndProvincesSuccess(data) {
            vm.notify(function () {
                vm.statesAndProvinces = data.items;
            });
            console.log(vm.statesAndProvinces);
            console.log("Succesfully loaded your dropdown list");
        }

        //if form is valid, update model!
        function _updateAddress() {
            vm.showEditAddressErrors = true;
            if (vm.addressForm.$valid) {
                console.log("data is valid!", vm.editAddress)
                vm.$addressesService.update(vm.updateAddressSuccess, vm.addressError, vm.editAddress, vm.addressId);    //Will probably need to use something else besides vm.addressId in the future
            } else {
                console.log("Form is not valid!");
            }
        }

        //success handler if the function "_updateAddress()" succeeds:
        function _updateAddressSuccess(returnedStatus) {
            vm.notify(function () {
                vm.items = returnedStatus;
            });
            console.log(vm.items);
            sabio.services.notifications.success("Successfully updated address!");
        }

        //error handler for any function in this scope:
        function _addressError(jqXhr, error) {
            console.log("No bueno :( Something went wrong.");
        }

    }
})();