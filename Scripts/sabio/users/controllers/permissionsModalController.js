(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('permissionsModalController', permissionsModalController);

    permissionsModalController.$inject = ['$scope'
        , '$baseController'
        , '$uibModalInstance'        
        , 'selectedUser'
        , 'selectedTeam'
        , '$rightsTypesService'
        , '$notificationsService'];

function permissionsModalController(
    $scope
    , $baseController
    , $uibModalInstance    
    , selectedUser
    , selectedTeam    
    , $rightsTypesService
    , $notificationsService) {

    var vm = this;
    vm.items = null;

    $baseController.merge(vm, $baseController);
    
    var rightsJson = JSON.parse($("#rightsTypesData").html());

    vm.rightsTypes = [];

    angular.forEach(rightsJson, function (val, key) {

        vm.rightsTypes.push({ id: parseInt(key), text: val });

    })

   
    console.log("rights types array as objects", vm.rightsTypes);
    
    

    vm.selectedUser = selectedUser || null;
    vm.selectedTeam = selectedTeam || null;

    console.log("selected user", vm.selectedUser);
        
    vm.$rightsTypesService = $rightsTypesService;
    vm.$uibModalInstance = $uibModalInstance;
    vm.$notificationsService = $notificationsService;
    vm.$scope = $scope;                               
    vm.notify = vm.$rightsTypesService.getNotifier($scope);
    
    vm.submit = _submit;
    vm.cancel = _cancel;

    vm.render = _render;
    vm.rightsLoadSuccess = _rightsLoadSuccess;   
    vm.onAddRightsSuccess = _onAddRightsSuccess;
    vm.rightsLoadError = _rightsLoadError;
    vm.onAddRightsError = _onAddRightsError;

    vm.userId = vm.selectedUser.aspNetUsersId;
    console.log("Here is the userId", vm.userId)

    vm.render();
   
    function _render() {       
        //  use vm.selectedUser.id here
        if (vm.userId) {
            vm.$rightsTypesService.loadRights(vm.userId, _rightsLoadSuccess, _rightsLoadError);
            console.log("items: ", vm.items);
        }

    }

    function _checkBoxes(value, checked) {
        var idx = vm.rightTypes.Id.indexOf(value);
        if (idx >= 0 && !checked) {
            vm.rightTypes.Id.splice(idx, 1);
        }
        if (idx < 0 && checked) {
           vm.rightTypes.Id.push(value);
        }
        console.log("We have a winner", idx);
    };

    function _cancel() {
        vm.$uibModalInstance.dismiss('cancel');
    };

    function _submit() {
       
        vm.$rightsTypesService.addRights(vm.items, _onAddRightsSuccess, _onAddRightsError)
        //vm.$uibModalInstance.close(vm.currentRights);
        console.log("Submit successful: " + JSON.stringify(vm.currentRights));
    };

    function _onAddRightsSuccess(data, status, settings) {
        console.log("We added the info")
    };

    function _onAddRightsError(ajax, status, errorThrown) {
        vm.$notificationsService.error("Rights were not updated: " + errorThrown);
    };

   
    // parse into array  - commented out code for this is below
    function _rightsLoadSuccess(data, status, settings) {
        vm.notify(function () {
            vm.items = data.items;
            console.log(vm.items);
        });
    }

    function _rightsLoadError(ajax, status, errorThrown) {
        vm.$notificationsService.error("Subscription request error: " + errorThrown);
    }

    
    
    function _rightsLoadSuccess(data, status, settings) {

        var rightsArray = [];
        var rights = data.items;
        for (var i = 0; i < rights.length; i++) {
            var rightsObject = rights[i];
            rightsArray.push(rightsObject.rights);
            console.log(rightsObject.rights);
        }
        vm.notify(function () {                                    
            vm.rightsArray = rightsArray;                                      
        });
        console.log(vm.rightsArray);
    }
    
}
})();