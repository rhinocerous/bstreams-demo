//**angular services: 

//breadcrumbs service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$breadcrumbsService', breadcrumbsServiceFactory);

    breadcrumbsServiceFactory.$inject = ['$baseService', '$sabio'];

    function breadcrumbsServiceFactory($baseService, $sabio) {
        var aSabioServiceObject = sabio.services.breadcrumbs;

        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        return newService;
    }
})();

//notifications service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$notificationsService", notificationsServiceFactory);

    notificationsServiceFactory.$inject = ["$baseService", "$sabio"];

    function notificationsServiceFactory($baseService, $Sabio) {
        var notificationsSvcObj = sabio.services.notifications;
        var newService = $baseService.merge(true, {}, notificationsSvcObj, $baseService);

        return newService;
    }
})();

//tags service
(function () {
    "use strict";

    angular.module(APPNAME)
        .factory("$tagsService", tagsServiceFactory);

    tagsServiceFactory.$inject = ["$baseService", "$sabio"];

    function tagsServiceFactory($baseService, $sabio) {
        var tagsSvcObj = sabio.services.tags;
        var newService = $baseService.merge(true, {}, tagsSvcObj, $baseService);
        return newService;
    }
})();


//----begin tagsBrowserController
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('tagsBrowserController', TagsBrowserController);

    TagsBrowserController.$inject = ['$scope', '$baseController', '$tagsService', '$notificationsService', '$uibModal', '$breadcrumbsService', '$routeParams', '$location'];

    function TagsBrowserController(
        $scope
        , $baseController
        , $tagsService
        , $notificationsService
        , $uibModal
        , $breadcrumbsService
        , $routeParams
        , $location) {

        //set up injected services/controllers
        var vm = this;
        vm.$scope = $scope;
        vm.$tagsService = $tagsService;
        vm.$notificationsService = $notificationsService;
        vm.$uibModal = $uibModal;
        vm.$breadcrumbsService = $breadcrumbsService;
        vm.$location = $location;

        $baseController.merge(vm, $baseController);

        //init vars
        vm.mainCategories = null;
        vm.subCategories = null;
        vm.subCategoriesExist = false;
        vm.selectedTab = null;
        vm.mainCatSelected = false;
        vm.selectedTag = null;
        vm.reason = null;
        vm.chosenData = [];
        vm.parent = [];

        //init functions
        vm.isActive = _isActive;
        vm.setSelectedTab = _setSelectedTab;
        vm.loadMainCategoryTags = _loadMainCategoryTags;
        vm.loadSuccess = _loadSuccess;
        vm.loadError = _loadError;
        vm.onCategoryClick = _onCategoryClick;
        vm.loadCategorySuccess = _loadCategorySuccess;
        vm.openTagModal = _openTagModal;
        vm.getParentSuccess = _getParentSuccess;
        vm.getParentError = _getParentError;


        //set up notifier so updates go to vm
        vm.notify = vm.$tagsService.getNotifier($scope);

        //capturing slug from URL + defining heading:
        vm.$tagSlug = $routeParams.tagSlug;
        vm.heading = vm.$tagSlug;

        //grab all tags with parentID = 0, purpose of this is to grab the IDs to use in our service functions:
        vm.$tagsService.selectByParentId(vm.getParentSuccess, vm.getParentError, 0);

        function _getParentSuccess(data) {
            for (var i = 0; i < data.items.length; i++) {
                vm.tempObj = {};
                vm.tempObj.id = data.items[i].id;
                vm.tempObj.slug = data.items[i].slug;
                vm.parent.push(vm.tempObj);

                //get the correct ID via vm.$tagSlug:
                if (vm.$tagSlug == vm.tempObj.slug) {
                    vm.tagId = vm.tempObj.id;
                }
            }
            console.log(vm.$tagSlug);
            console.log(vm.tagId);

            //after defining tagId, get synonym options for select menu in modal **had to move this from modal controller as data was coming back too late to get loaded into modal select
            vm.$tagsService.selectByParentIdPlusChildren(getSuccess, getError, vm.tagId);
        }

        function _getParentError(error) {
            console.log("Unable to get objects", error);
        }

        //loads main category tags for image bank 
        vm.loadMainCategoryTags();

        function getSuccess(data) {
            var tempArray = [];
            for (var i = 0; i < data.items.length; i++) {
                tempArray.push(data.items[i]);
            }
            vm.notify(function () {
                vm.chosenData = tempArray;
            });
        }
        function getError(jqXhr, error) {
            console.log("uh-oh. something went wrong when trying to get data to load chosen..." + error);
        }

        //gets all main category tags for image bank 
        function _loadMainCategoryTags() {
            //vm.$tagsService.selectImageBankMainCategories(vm.loadSuccess, vm.loadError)
            //vm.$tagsService.selectByParentId(vm.loadSuccess, vm.loadError, vm.tagId);
            vm.$tagsService.selectBySlugPlusChildren(vm.loadSuccess, vm.loadError, vm.$tagSlug);
        }
        //on success
        function _loadSuccess(data) {
            console.log("im firing...loading main categories");
            vm.notify(function () {
                vm.mainCategories = data.items;
            });
        }
        //on error
        function _loadError(error) {
            console.log("an error has occurred..." + error);
        }
        //sets the selected main category tab
        function _setSelectedTab(tab) {
            console.log("setting selected tab", tab);
            vm.selectedTab = tab;
        }
        //drives ng-show for arrow in button && button appearance - 'btn-success' with arrow if selected, 'btn-primary' with no arrow if not active
        function _isActive(tag) {
            return vm.selectedTab === tag;
        }
        //ng-click function to load sub-categories and their children when main category is selected
        function _onCategoryClick(tagId, tag) {
            console.log("tag: " + JSON.stringify(tagId));
            //saves the parent slug to append to the url
            vm.mainCatSelected = true;                      //makes edit button appear
            vm.setSelectedTab(tagId);
            vm.selectedTag = tag;
            vm.$tagsService.selectByParentIdPlusChildren(vm.loadCategorySuccess, vm.loadError, tagId);
        }
        //builds array witn nested children on successfull call 
        function _loadCategorySuccess(data) {
            console.log("data items: " + JSON.stringify(data.items));
            var tempData = data.items;
            var nestedData = [];
            if (tempData != null) {                                     //check if data is not null then build array
                tempData.forEach(function (arrayItem) {
                    if (arrayItem.parentId == vm.selectedTab) {
                        var newItem = arrayItem;
                        newItem.children = []
                        tempData.forEach(function (arrayItem) {
                            if (arrayItem.parentId === newItem.id) {
                                newItem.children.push(arrayItem);
                            }
                        })
                        nestedData.push(newItem);
                    }
                });
                vm.notify(function () {                                 //notify vm that subcategories are there and assign nestedData array
                    vm.subCategoriesExist = true;
                    vm.subCategories = nestedData;
                });
            } else if (tempData == null) {                              //if data is null, clear out any old sub-categories from array
                vm.notify(function () {
                    vm.subCategoriesExist = false;
                    vm.subcategories = null;
                })
            }
        }

        //ng-click opens modal on add/edit request
        function _openTagModal(parentTag, level, type, thisTag) {       //pass parentTag (used for add), level & type for modal header, thisTag for update func
            var addEditType;
            //set up modal header text
            switch (level) {
                case 'mainCat':
                    addEditType = type + " Main Category"
                    break;
                case 'subCat':
                    addEditType = type + " Sub-Category"
                    break;
                case 'childTag':
                    addEditType = type + " Child Tag"
                    break;
            }

            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: 'taxonomyMgrModalContent.html',
                windowClass: 'modal modal-message fade in modalNg',
                controller: 'modalController as mc',
                resolve: {
                    parentId: function () {
                        return parentTag;
                    },
                    addEditType: function () {
                        return addEditType;
                    },
                    selectedTab: function () {
                        return vm.selectedTab
                    },
                    thisTag: function () {
                        return thisTag;
                    },
                    funcType: function () {
                        return type;
                    },
                    chosenData: function () {
                        return vm.chosenData;
                    }
                }
            });

            modalInstance.result.then(function (modalResult) {

            }, function (reason) {
                vm.notify = vm.$tagsService.getNotifier($scope);
                if (reason === 'deleted' || reason === 'added') {                                    //check if item was added or deleted
                    if (level === 'mainCat') {                                                       //if mainCat added/deleted, reload main categories and set sub-cat back to null array
                        vm.mainCatSelected = false;
                        vm.selectedTab = null;
                        vm.loadMainCategoryTags();
                        vm.subCategories = [];
                    } else {
                        vm.onCategoryClick(vm.selectedTab, vm.selectedTag);                         //if not main cat, reload sub-cats & children to reflect changes
                    }
                    vm.$notificationsService.success("Tag(s) " + reason + " successfully.")         //show success message
                } else if (reason === 'cancel') {                                                   //if modal was closed via cancel, don't show notification
                    //do nothing
                } else {                                                                            //if updated, reload main category tabs, sub-cats & children to reflect changes
                    vm.loadMainCategoryTags();
                    vm.selectedTab ? vm.onCategoryClick(vm.selectedTab, vm.selectedTag) : console.log("nothing selected");
                    vm.$notificationsService.success("Tag was " + reason + " successfully");        //show success notification
                }
            });
        };

    } //end ctrl
})();
//----end tasBrowserController



//----MODAL CONTROLLER:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('modalController', ModalController);

    ModalController.$inject = ['$scope', '$baseController', '$uibModalInstance', '$tagsService', 'parentId', 'addEditType', 'selectedTab', 'thisTag', 'funcType', 'chosenData'];

    function ModalController(
        $scope
        , $baseController
        , $uibModalInstance
        , $tagsService
        , parentId
        , addEditType
        , selectedTab
        , thisTag
        , funcType
        , chosenData) {

        //set up injected services/controllers
        var vm = this;
        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        vm.$tagsService = $tagsService
        vm.$uibModalInstance = $uibModalInstance;
        vm.parentId = parentId;
        vm.addEditType = addEditType;
        vm.selectedTab = selectedTab;
        vm.tag = thisTag;
        vm.funcType = funcType;
        vm.chosenData = chosenData;

        //init vars
        vm.editRequest = vm.funcType === 'Edit' ? true : false;         //checks if funcType === 'Edit' to drive ng-show of 'delete' button in modal
        vm.showTagErrors = false;
        vm.deleteRequest = false;                                       //drives ng-show of 'confirm delete well' in modal
        vm.deleteRequestList = null;                                    //will hold items to be deleted that will appear in 'confirm delete well'

        //init functions
        vm.addEditTag = _addEditTag;
        vm.delete = _delete;
        vm.confirmDelete = _confirmDelete;
        vm.cancelDelete = _cancelDelete;
        vm.onAddEditError = _onAddEditError;
        vm.makeSlug = _makeSlug;

        //set up notifier so updates go to vm
        vm.notify = vm.$tagsService.getNotifier($scope);

        //ng-blur on tag populates slug field by using replace & regex
        function _makeSlug() {
            var slug = vm.tag.tags.replace(/\W+/g, '-').toLowerCase();
            vm.tag.slug = slug;
        }


        //ng-click for modal submit
        function _addEditTag() {
            vm.showTagErrors = true;
            if (vm.addEditTagForm.$valid) {
                vm.tag = vm.tag;
                if (vm.funcType === 'Add') {                                                    //if funcType === add, make insert call and use parentId passed into modal
                    vm.tag.parentId = vm.parentId;
                    vm.$tagsService.insert(vm.okAdd, vm.onAddEditError, vm.tag);
                } else {                                                                        //if funcType === edit, make update call
                    vm.$tagsService.update(vm.okUpdate, vm.onAddEditError, vm.tag, vm.tag.id)
                }

            } else {
                console.log("form has invalid data...errors should be showing");
            }
        }

        //on add success, dismiss modal and pass 'added' back to tagsBrowserController
        vm.okAdd = function () {
            vm.$uibModalInstance.dismiss('added');
            console.log("submit success: " + JSON.stringify(vm.tag));
        }

        //on update success, dismiss modal and pass 'updated' back to tagsBrowserController
        vm.okUpdate = function () {
            vm.$uibModalInstance.dismiss('updated');
            console.log("update success: " + JSON.stringify(vm.tag));
        }

        //ng-click on delete - get by id plus descendants to warn user of tags to be deleted
        function _delete() {
            vm.$tagsService.selectByIdPlusDescendants(deleteSuccess, vm.onAddEditError, vm.tag.id);
        }

        //populates and shows 'confirm delete well' with list of tags to be deleted && hides regular modal buttons
        function deleteSuccess(data) {
            vm.notify(function () {
                vm.deleteRequestList = data.items;
                vm.deleteRequest = true
            })
        }

        //hides 'confirm delete well' && re-shows regular modal buttons
        function _cancelDelete() {
            vm.deleteRequest = false;
        }

        //ng-click on confirm delete - deletes selected item and descendants //might need to update the last argument for this one... to vm.tagId
        function _confirmDelete() {
            vm.$tagsService.deleteByIdPlusDescendants(confDeleteSuccess, vm.onAddEditError, vm.tag.id);
        }

        //on delete success, dismisses modal and passes 'deleted' back to tagsBrowserController
        function confDeleteSuccess() {
            vm.$uibModalInstance.dismiss('deleted');
        }

        //ng-click for cancel modal - dismisses modal and passes 'cancel' back to tagsBrowserController
        vm.cancel = function () {
            vm.$uibModalInstance.dismiss('cancel');
        }

        //generic error callback
        function _onAddEditError(jqXhr, error) {
            console.log("an error has occurred: " + error);
        }

    }

})();
//----end modalController