//**angular services: 
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


//----begin main controller:
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialTaggingController', EditorialTaggingController);

    EditorialTaggingController.$inject = ['$scope', '$baseController', '$tagsService', '$notificationsService', '$routeParams'];

    function EditorialTaggingController(
        $scope
        , $baseController
        , $tagsService
        , $notificationsService
        , $routeParams) {

        //set up injected services/controllers
        var vm = this;
        vm.$scope = $scope;
        vm.$tagsService = $tagsService;
        vm.$notificationsService = $notificationsService;
        vm.$editorialId = $routeParams.editorialId;

        console.log(vm.$editorialId);

        $baseController.merge(vm, $baseController);

        //init vars
        vm.mainCategories = null;
        vm.subCategories = null;
        vm.selectedTab = null;
        vm.selectedTag = null;
        vm.childrenOfSubCat = null; //using this to store the children of the subCat
        vm.tagId = 2 //because this feature is for editorial(ID of 2)
        vm.children = null;//ng-model of the select dropdown
        vm.subCategoriesExist = false;
        vm.hasItems = false;

        //init functions
        vm.onCategoryClick = _onCategoryClick;
        vm.loadMainCategoryTags = _loadMainCategoryTags;
        vm.loadCategorySuccess = _loadCategorySuccess;
        vm.isActive = _isActive;
        vm.setSelectedTab = _setSelectedTab;
        vm.loadSuccess = _loadSuccess;
        vm.loadError = _loadError;

        //set up notifier so updates go to vm
        vm.notify = vm.$tagsService.getNotifier($scope);

        //loads main category tags for image bank 
        vm.loadMainCategoryTags();

        //gets all main category tags for image bank 
        function _loadMainCategoryTags() {
            vm.$tagsService.selectByParentId(vm.loadSuccess, vm.loadError, vm.tagId);
            //vm.$tagsService.selectBySlugPlusChildren(vm.loadSuccess, vm.loadError, vm.$tagSlug);
        }
        //on success - load main editorial tags
        function _loadSuccess(data) {
            console.log("im firing...loading main categories");
            vm.notify(function () {
                vm.mainCategories = data.items;
            });
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
            vm.setSelectedTab(tagId);
            vm.selectedTag = tag;
            vm.$tagsService.selectByParentIdPlusChildren(vm.loadCategorySuccess, vm.loadError, tagId);
        }

        function _loadCategorySuccess(data) {
            vm.notify(function () {
                //checks to see if there are items to loop through:
                if (data.items !== null) {
                    //array to contain chosen content:
                    vm.childrenOfSubCat = [];
                    //filtering out the subcategories, so we keep only the children of the subcategories:
                    for (var i = 0; i < data.items.length; i++) {
                        if (data.items[i].parentId !== vm.selectedTab) {
                            vm.childrenOfSubCat.push(data.items[i]);
                        }
                    }
                    //checks to see if there are any subCat children to display:
                    if (vm.childrenOfSubCat.length > 0) {
                        //will display the chosen dropdown only if there are items to display:
                        vm.subCategoriesExist = true;
                        //show arrow:
                        vm.hasItems = true;
                    }
                } else {
                    vm.subCategoriesExist = false;
                    vm.hasItems = false;
                }
            });
        }

        //on error
        function _loadError(error) {
            console.log("an error has occurred..." + error);
        }

    } //end ctrl
})();
//----end of controller