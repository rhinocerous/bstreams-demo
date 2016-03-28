(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialMediaBucketController', EditorialMediaBucketController);

    EditorialMediaBucketController.$inject = ['$scope', '$routeParams', '$baseController', '$uibModalInstance', 'mediaIds','$folderService', '$editorialService', '$mediaService'];

    function EditorialMediaBucketController(
        $scope
        , $routeParams
        , $baseController
        , $uibModalInstance
        , mediaIds
        , $folderService
        , $editorialService
        , $mediaService) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$routeParams = $routeParams;
        vm.$uibModalInstance = $uibModalInstance;
        vm.$scope = $scope;
        vm.$folderService = $folderService;
        vm.$editorialService = $editorialService;
        vm.$mediaService = $mediaService;
        vm.notify = vm.$folderService.getNotifier(vm.$scope);

        vm.mediaIds = mediaIds;

        vm.ajaxCallError = _ajaxCallError;
        vm.loadParent = _loadParent;
        vm.selectFolder = _selectFolder;
        vm.selectMedia = _selectMedia;
        vm.unselectMedia = _unselectMedia;
        vm.done = _done;
        vm.cancel = _cancel;

        vm.ajaxCallError = _ajaxCallError;

        vm.name = "editorialMediaBucketController";

        vm.parentId = 0;
        vm.currentLevel = null;
        vm.selectedMedias = [];
        vm.selectedMediaIds = [];
        vm.crumbs = [];

        render();
        function render() {
            _loadTreeLevel();
            console.log('mediaIds' + JSON.stringify(vm.mediaIds));
            if (vm.mediaIds.length > 0) {
                var mediaIds = new Object;
                mediaIds.mediaIdList = vm.mediaIds;
                console.log()
                vm.$mediaService.getMultipleByIds(mediaIds, getLinkedMediaSuccess, vm.ajaxCallError);
            }
        };


        function getLinkedMediaSuccess(data) {
            vm.selectedMedias = data.items;
            for (var i = 0; i < data.items.length; i++) {
                vm.selectedMediaIds.push(data.items[i].mediaId);
            }
            //console.log('vm.selectedMedias: ' + JSON.stringify(vm.selectedMedias));
        }



        function _ajaxCallError(ajax, status, errorThrown) {
            console.log("error: " + errorThrown);
        };

        function _selectFolder(folder) {
            vm.crumbs.push(folder);

            vm.parentId = folder.folderId;

            _loadTreeLevel();

            console.log("select folder", folder);
        }

        function _selectMedia(media) {
            console.log("select media", media);

            if (vm.selectedMediaIds.indexOf(media.mediaId) < 0) {
                vm.selectedMedias.push(media);
                vm.selectedMediaIds.push(media.mediaId);
            }
        }

        function _unselectMedia(media) {
            console.log("unselect media", media);
            console.log('selectedMediaIds Before...' + JSON.stringify(vm.selectedMediaIds));
            var index = vm.selectedMediaIds.indexOf(media.mediaId);
            if (index >= 0) { //if mediaId is in selectedMediaIds array
                vm.selectedMedias.splice(index, 1);
                vm.selectedMediaIds.splice(index, 1);
            }
            console.log('selectedMediaIds After...' + JSON.stringify(vm.selectedMediaIds));

        }

        function _loadParent(parentId) {
            vm.parentId = parentId;

            if (parentId == 0) {
                vm.crumbs = [];
            }
            else {
                if (vm.crumbs && vm.crumbs.length) {
                    for (var x = 0; x <= vm.crumbs.length; x++) {
                        if (vm.crumbs[x].folderId == parentId) {
                            vm.crumbs.splice(x + 1, (vm.crumbs.length - x));

                            break;
                        }
                    }
                }
            }

            _loadTreeLevel();
        }

        function _loadTreeLevel() {
            console.log("load tree level");
            vm.$folderService.selectByParentFolderId(vm.parentId, _onTreeLevelSuccess, _onTreeLevelError)
        }

        function _onTreeLevelSuccess(data) {
            if (data.item) {
                vm.notify(function () {
                    vm.currentLevel = data.item;

                    console.log("got tree level", vm.currentLevel);
                })
            }
        }

        function _onTreeLevelError(err) {
            console.error("error getting tree level", err);
        }

        function _done() {
            console.log(vm.selectedMediaIds);
            vm.$uibModalInstance.close({ status: "ok", selectedMediaIds: vm.selectedMediaIds });
        };

        function _cancel() {
            vm.$uibModalInstance.dismiss('cancel');
        };
    }
})();