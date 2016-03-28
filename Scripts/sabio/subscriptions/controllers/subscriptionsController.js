//SUBSCRIPTION CONTROLLER TO LOAD SUBS + OPEN A MODAL WINDOW
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('subscriptionsController', subscriptionsController);

    subscriptionsController.$inject = ['$scope'
        , '$baseController'
        , '$subscriptionsService'
        , '$uibModal'];

    function subscriptionsController(
        $scope
        , $baseController
        , $subscriptionsService
        , $uibModal) {

        //Initial property values
        var vm = this;
        vm.items = null;

        vm.$subscriptionsService = $subscriptionsService;
        vm.$scope = $scope;
        vm.$uibModal = $uibModal;

        //  Hoisting; bindable members (functions)
        vm.openSubModal = _openSubModal;                                  //opens modal window

        $baseController.merge(vm, $baseController);

        vm.notify = vm.$subscriptionsService.getNotifier($scope);

        renderAllSubscriptions();                                   //fires the function to populate Index view with subscriptions

        function renderAllSubscriptions() {
            vm.$subscriptionsService.allSubscriptions(vm.receiveItems, vm.onSubError);
        }

        function _receiveItems(data) {
            //Reformats date from DB into appropriate format for AngularJS datepicker
            for (var h = 0; h < data.items.length; h++) {
                var subStartDate = data.items[h].startDate;
                data.items[h].startDate = new Date(subStartDate);

                var subExpireDate = data.items[h].expireDate;
                data.items[h].expireDate = new Date(subExpireDate);
            }
            vm.notify(function () {
                vm.items = data.items;
            });
            console.log("Here are all of the subscriptions: ", data.items);
        }

        function _onSubError(jqXhr, error) {
            console.error(error);
        }

        function _openSubModal(selectedSub) {
            var selectedSub, subId, subAction;
            //EDIT - MODAL VIEW
            if (selectedSub) {
                selectedSub = selectedSub;
                subId = selectedSub.subscriptionId;
                subAction = "Update Subscription Id #" + subId;
            }
                //CREATE - MODAL VIEW
            else {
                selectedSub, subId = null;
                subAction = "Add New Subscription";
            }

            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: '/Scripts/sabio/subscriptions/templates/subscriptionsModal.html',
                windowClass: 'modal modal-message fade in modalNg',
                controller: 'subscriptionsModalController as mc',
                resolve: {
                    sub: function () {
                        return selectedSub;
                    },
                    subId: function () {
                        return subId;
                    },
                    subAction: function () {
                        return subAction;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                renderAllSubscriptions();
            });
        }
    }
})();