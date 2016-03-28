(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialIndexController', EditorialIndexController);

    EditorialIndexController.$inject = ['$scope', '$routeParams', '$uibModal', '$baseController', '$editorialService'];

    function EditorialIndexController(
        $scope
        , $routeParams
        , $uibModal
        , $baseController
        , $editorialService) {

        var vm = this;

        $baseController.merge(vm, $baseController);
        
        vm.$routeParams = $routeParams;        
        vm.$scope = $scope;
        vm.$uibModal = $uibModal;
        vm.$editorialService = $editorialService;
        vm.notify = vm.$editorialService.getNotifier($scope);

        vm.ajaxCallError = _ajaxCallError;
        vm.editorialGetLinkingByEidSuccess = _editorialGetLinkingByEidSuccess;
        vm.getReadyToOpenModal = _getReadyToOpenModal;
        vm.openLinking = _openLinking;
        vm.duplicateEditorial = _duplicateEditorial;
        vm.deleteEditorial = _deleteEditorial;
        vm.grabNamesFromJSON = _grabNamesFromJSON;

        vm.duplicateEditorialSuccess = _duplicateEditorialSuccess;
        vm.deleteEditorialSuccess = _deleteEditorialSuccess;
        vm.onError = _onError;

        vm.editorials = null;
        vm.currentEditorial = null;
        vm.name = "editorialIndexController";
        vm.status = vm.$routeParams.status.toUpperCase();
        vm.params = {
            currentPage: 1,
            pageSize: 20,
            pendingOnly: (vm.$routeParams.status == 'pending')
        };
       
        console.log("editorial index type [%s]", vm.$routeParams.status);

        _init();

        function _ajaxCallError(ajax, status, errorThrown) {
            console.error("error: " + errorThrown);
        };

        function _init() {

            vm.statusOptions = JSON.parse($("#editorialStatus").html());

            vm.$editorialService.search(vm.params, _onSearchSuccess, _onSearchError);
        };

        function _editorialGetLinkingByEidSuccess(data, status, settings) {            
            var mediaIds = [];
            for (var i in data.items) {                
                mediaIds.push(data.items[i].mediaId);
            }            
            vm.openLinking(mediaIds)
        };

        function _getReadyToOpenModal(editorial) {
            vm.currentEditorial = editorial;
            vm.$editorialService.getLinkingByEid(editorial.editorialId, vm.editorialGetLinkingByEidSuccess, vm.ajaxCallError);

        }

        function _deleteEditorial(ed) {
            if (confirm("Are you sure you want to delete Editorial " + ed.editorialId)) {

                console.log("deleting editorial #", ed);
                var indexOfEditorial = vm.editorials.indexOf(ed);
                if (indexOfEditorial > -1) {
                    vm.editorials.splice(indexOfEditorial, 1); //remove from table
        }
                vm.$editorialService.deleteEditorial(ed.editorialId, vm.deleteEditorialSuccess, vm.onError);
            }

        };

        function _duplicateEditorial(ed) {
            console.log("duplicating editorial #", ed);
            vm.$editorialService.duplicateEditorial(ed, vm.duplicateEditorialSuccess, vm.onError);
        };

        function _openLinking(mediaIds)
        {            
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: '/Scripts/sabio/editorial/templates/modal/mediaBucket.html',      
                controller: 'editorialMediaBucketController',
                windowClass: "modal modal-message fade in modalNg",
                controllerAs:'bucket',
                size: 'lg',
                resolve: {                      
                    mediaIds: function () {
                        return mediaIds;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                console.log("modal closed", selectedItem)
                vm.$editorialService.updateAllLinking(vm.currentEditorial.editorialId, JSON.stringify(selectedItem.selectedMediaIds));
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        function _editorialGetLinkingByEidSuccess(data, status, settings) {
            
            var mediaIds = [];
            for (var i in data.items) {
                
                mediaIds.push(data.items[i].mediaId);
            }
            
            vm.openLinking(data.items)
        };


        function _grabNamesFromJSON(data) {
            for (var i in data.items) {

                //grab editors from each editorial and produce a comma-separated list of first names
                data.items[i].editorsFirstNames = "";
                for (var j in data.items[i].editor) {
                    data.items[i].editorsFirstNames += (data.items[i].editor[j].firstName) + ", ";
                }
                data.items[i].editorsFirstNames = data.items[i].editorsFirstNames.slice(0, data.items[i].editorsFirstNames.length - 2); //delete last comma

                //grab designers from each editorial and produce a comma-separated list of first names
                data.items[i].designersFirstNames = "";
                for (var j in data.items[i].designer) {
                    data.items[i].designersFirstNames += (data.items[i].designer[j].firstName) + ", ";
                }
                data.items[i].designersFirstNames = data.items[i].designersFirstNames.slice(0, data.items[i].designersFirstNames.length - 2); //delete last comma
        }

            vm.notify(function () {
                vm.editorials = data.items
            });
        };

        function _onSearchSuccess(data) {
            vm.grabNamesFromJSON(data);
        };

        function _duplicateEditorialSuccess(data) {            
            vm.grabNamesFromJSON(data);
        };

        function _deleteEditorialSuccess(data) {

        };

        function _onError(err) {
            console.error("ajax error", err);
        };

        function _onSearchError(err) {
            console.error("error searching editorials", err);
        };
    }
})();