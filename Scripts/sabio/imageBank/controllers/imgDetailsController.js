//Controller for editting image details -- currently can pull up data + save/update data for ONE image:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('imgDetailsController', ImgDetailsController);

    ImgDetailsController.$inject = ['$scope', '$baseController', '$imageDetailsService', '$mediaService'];

    function ImgDetailsController(
        $scope,
        $baseController,
        $imageDetailsService,
        $mediaService) {

        var vm = this;
        vm.$scope = $scope;
        vm.$imageDetailsService = $imageDetailsService;
        vm.$mediaService = $mediaService;

        $baseController.merge(vm, $baseController);

        //defining variables + success/error handlers:
        vm.editImageDetailsForm = null;
        vm.onSaveImageDetailsClick = _onSaveImageDetailsClick;
        vm.updateIbMediaSuccess = _updateIbMediaSuccess;
        vm.updateImgDetailsSuccess = _updateImgDetailsSuccess;
        vm.openDatepicker = _openDatepicker;
        vm.datepickerFocus = _datepickerFocus;
        vm.showFormErrors = false;
        vm.liveDateOpened = false;

        //variables will be defined through the broadcast/listen event - comes from mediaLibController.js:
        vm.mDetails;
        vm.currentImageDetails;

        vm.$systemEventService.listen("imgEditData", _unpackageData);
        
        function _unpackageData(event, payload) {
            console.log(event, payload[1]);
            vm.mDetails = payload[1].mDetails;
            vm.currentImageDetails = payload[1].currentImageDetails;
        }

        function _openDatepicker($event, dateType) {
            if (dateType == 'liveDate') {
                vm.liveDateOpened = true;
            }
        }

        function _datepickerFocus($event, dateType) {
            if (dateType == 'liveDate') {
                vm.liveDateOpened = true;
            }
        }

        function _onSaveImageDetailsClick() {
            vm.showFormErrors = true;
            if (vm.editImageDetailsForm.$valid) {
                vm.$mediaService.updateBS(vm.mDetails.mediaId, vm.mDetails, vm.updateIbMediaSuccess, vm.ajaxCallError);
                vm.$imageDetailsService.upsert(vm.updateImgDetailsSuccess, vm.ajaxCallError, vm.currentImageDetails, vm.mDetails.mediaId);
            }
        }

        function _updateIbMediaSuccess(data, status, settings) {
            console.log("update media success", data);
        }

        function _updateImgDetailsSuccess() {
            vm.$systemEventService.broadcast("imgTagInsertAndEditSuccess", { imageDetailsCheck: true });
        }
    }
})();
