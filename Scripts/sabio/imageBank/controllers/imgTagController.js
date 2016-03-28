//Modal controller for image tagging:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('imageTagController', ImageTagController);

    ImageTagController.$inject = ['$scope', '$baseController', '$tagsService', '$mediaService'];

    function ImageTagController(
        $scope,
        $baseController,
        $tagsService,
        $mediaService) {

        var vm = this;
        vm.$scope = $scope;
        vm.$tagsService = $tagsService;
        vm.$mediaService = $mediaService;
        vm.notify = vm.$tagsService.getNotifier($scope);

        $baseController.merge(vm, $baseController);

        //defining variables + success/error handlers:
        vm.successMediaTagsInsert = _successMediaTagsInsert;
        vm.onCheckboxClick = _onCheckboxClick;
        vm.selectByMultipleIdsSuccess = _selectByMultipleIdsSuccess;
        vm.ajaxCallError = _ajaxCallError;
        vm.userTagSelection = _userTagSelection;
        vm.submitTagsForMedia = _submitTagsForMedia;
        vm.getChosenData = _getChosenData;

        //variables will be defined after data is captured from the medLibController:
        vm.imgBankCategories;
        vm.selectedMediaObj;
        vm.selectedMediaIds;
        vm.singleMediaWithTags;

        //other variables -- all defined on this page:
        vm.rootTagsIdArray = []; //IDs of image bank categories 
        vm.selectedCategories = {};
        vm.selectedContainer = [];
        vm.categoriesForm = null;
        vm.chosenForm = null;
        vm.chosenData = null;
        vm.currentChosenTags = null;
        vm.singleMediaCheck = false;

        vm.$systemEventService.listen("imgTagData", _unpackageData);

        function _unpackageData(event, payload) {
            console.log(payload, payload[1]);
            vm.imgBankCategories = payload[1].imageBankCategories;
            vm.selectedMediaObj = payload[1].selectedMediaObj;
            vm.selectedMediaIds = payload[1].selectedMediaIds;
            vm.singleMediaWithTags = payload[1].singleMediaWithTags;

            if (vm.rootTagsIdArray.length == 0) {
                //generates the array to hold all IDs of the root tags:
                for (var c = 0; c < vm.imgBankCategories.length; c++) {
                    var id = vm.imgBankCategories[c].id;
                    vm.rootTagsIdArray.push(id);
                }

                console.log("root tags:", vm.rootTagsIdArray);
            }

            //Will only populate checked checkboxes + chosen selections if there is ONE media AND tags to work with:
            if (vm.selectedMediaObj.length == 1 && vm.singleMediaWithTags.tags) {
                vm.singleMediaCheck = true;
                vm.tagIdArrayForChosen = [];

                //grab tagIds + create array:
                for (var i = 0; i < vm.singleMediaWithTags.tags.length; i++) {
                    var tagId = vm.singleMediaWithTags.tags[i].id;
                    vm.tagIdArrayForChosen.push(tagId);

                    //grab tags' parentIDs + create another array:
                    var tagPid = vm.singleMediaWithTags.tags[i].parentId;
                    var rIndex = vm.rootTagsIdArray.indexOf(tagPid);            //checks if the parentId exists in the root tags (prevents IDs of child tags from being sent with an ajax call to db)

                    if (rIndex !== -1) {                                         //if tags' parentID is a root tag, then filter out tags with duplicate parentId
                        var returnedIndex = vm.selectedContainer.indexOf(tagPid);
                        if (returnedIndex == -1) {
                            vm.selectedContainer.push(tagPid);
                            vm.selectedCategories[tagPid] = true;
                        }
                    }
                }
                vm.currentChosenTags = vm.tagIdArrayForChosen;     //push tagId array to select previously chosen tags for this media in the chosen dropdown
                vm.getChosenData();
            } else if (vm.selectedMediaObj.length > 1) {
                vm.selectedCategories = {};
                vm.currentChosenTags = null;
                //vm.chosenData = null;
            }
        }



        function _getChosenData() {
            if (vm.selectedContainer && vm.selectedContainer.length > 0) {
                console.log(vm.selectedContainer);
                $tagsService.selectByMultipleIdsPlusDescendants(vm.selectByMultipleIdsSuccess, vm.ajaxCallError, vm.selectedContainer);
            }
        }

        function _onCheckboxClick() {
            //console.log("selected Categories", vm.selectedCategories);
            vm.selectedContainer = [];
            //vm.currentChosenTags = null;
            //vm.chosenData = [];
            for (var key in vm.selectedCategories) {
                //console.log("key:", key);
                if (vm.selectedCategories.hasOwnProperty(key)) {
                    console.log(key + " -> " + vm.selectedCategories[key]);
                    if (vm.selectedCategories[key] == true) {
                        var checkForDuplicates = vm.selectedContainer.indexOf(vm.selectedCategories[key]);
                        if (checkForDuplicates == -1) {
                            var temp = parseInt(key);
                            vm.selectedContainer.push(temp);
                        }
                    }
                }
            }
            vm.getChosenData();
        }


        function _ajaxCallError(ajax, status, errorThrown) {
            console.log("error: ", ajax, status, errorThrown);
        };


        function _selectByMultipleIdsSuccess(data, status, settings) {
            console.log("select by multiple ids success", data.items);
            vm.chosenData = [];

            vm.notify(function () {
                //getting items for chosen dropdown:
                for (var k = 0; k < data.items.length; k++) {
                    if (data.items[k].parentId !== 1) {
                        var l = new Object();
                        l = data.items[k];
                        vm.chosenData.push(l);
                    }
                }
            });
        }

        //keeps track of the tags that the user has selected, by tag id:
        function _userTagSelection() {
            console.log("user selected a tag:", vm.currentChosenTags);
        }

        //submit handler for 'save' btn:     
        function _submitTagsForMedia() {
            var myData = {
                tagId: vm.currentChosenTags,
                mediaId: vm.selectedMediaIds
            }
            console.log(myData);
            vm.$mediaService.insertTagsByMediaId(myData, vm.successMediaTagsInsert, vm.ajaxCallError);
        };

        function _successMediaTagsInsert(data) {
            console.log(data);
            vm.$systemEventService.broadcast("imgTagInsertAndEditSuccess", { imageDetailsCheck: false });
        }
    }
})();
