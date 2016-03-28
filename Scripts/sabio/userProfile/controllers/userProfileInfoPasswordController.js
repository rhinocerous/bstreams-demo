//USER PROFILE INFO & PASSWORD CONTROLLER
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('userProfileInfoPasswordController', userProfileInfoPasswordController);

    userProfileInfoPasswordController.$inject = ['$scope', '$baseController', '$usersService', '$notificationsService', '$routeParams', '$location'];

    function userProfileInfoPasswordController(
        $scope
        , $baseController
        , $usersService
        , $notificationsService
        , $routeParams
        , $location) {

        var vm = this;
        vm.userForm = null;
        vm.passForm = null;
        vm.currentUser = null;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$usersService = $usersService;
        vm.$notificationsService = $notificationsService;
        vm.$routeParams = $routeParams;
        vm.$location = $location;


        vm.showEditInfoPassErrors = false;

        vm.notify = vm.$usersService.getNotifier($scope);


        //HOISTED FUNCTIONS
        vm.loadUser = _loadUser;                                                      //Loads current user info
        vm.successUsersProfileSelectByUserID = _successUsersProfileSelectByUserID;    //Success handler - loading current user info
        vm.updateUser = _updateUser;                                                  //Updating user info
        vm.successUsersProfileUpdate = _successUsersProfileUpdate;                    //Success handler - updating user info
        vm.updatePassword = _updatePassword;                                          //Updating password
        vm.successUsersProfileUpdatePassword = _successUsersProfileUpdatePassword;    //Success handler - updating password
        vm.errorUsersProfileManage = _errorUsersProfileManage;                        //Error handler - updating user info or password

        
        var hyperlinks = [
            {
                "text": "Edit Profile",
                "link": "#/infoPassword"
            }
        ];

        sabio.services.breadcrumbs.onSetBreadcrumbs(hyperlinks);

        _loadUser();

        //DEFINING FUNCTIONS

        function _loadUser() {
            vm.$usersService.getCurrentUser(vm.successUsersProfileSelectByUserID, vm.errorUsersProfileManage);

        }

        function _successUsersProfileSelectByUserID(data, status, settings) {
            vm.showEditInfoPassErrors = false;

            vm.currentUser = data.item;

            if (vm.currentUser.phone == null) {
                vm.currentUser.phone = '';
            }

            vm.$notificationsService.success("User data successfully loaded.")
            console.log(JSON.stringify(data));

        }

        function _updateUser() {
            vm.showEditInfoPassErrors = true;

            if (vm.userForm.$valid) {

                vm.$usersService.onUsersProfileUpdate(vm.successUsersProfileUpdate, vm.errorUsersProfileManage, vm.currentUser);
            }
            else {

            }
        }

        function _successUsersProfileUpdate() {
            console.log(JSON.stringify(vm.currentUser));

            vm.$notificationsService.success("User info update successful.");
        }


        function _updatePassword() {
            vm.showEditInfoPassErrors = true;

            if (vm.passForm.$valid) {

                vm.$usersService.onUsersProfileUpdatePassword(vm.successUsersProfileUpdatePassword, vm.errorUsersProfileManage, vm.currentUser);
            }
            else {

            }
        }

        function _successUsersProfileUpdatePassword() {
            console.log(JSON.stringify(vm.currentUser));

            vm.$notificationsService.success("Password update successful.");
        }

        //Error handler
        function _errorUsersProfileManage() {

            vm.$notificationsService.error("Form not valid.");
        }


    }

})();
