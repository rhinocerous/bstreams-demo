(function () {                                                                                                
    "use strict";

    angular.module(APPNAME)
        .controller('editorialAttributesController', EditorialAttributesController);

    EditorialAttributesController.$inject = ['$scope', '$baseController', '$usersService', '$notificationsService', '$editorialService', '$routeParams', '$location'];

    function EditorialAttributesController(
        $scope
        , $baseController
        , $usersService
        , $notificationsService
        , $editorialService
        , $routeParams
        , $location) {

        var vm = this;                                                                                                  //set scope to vm and set up services, routeParam storage
        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;
        vm.$usersService = $usersService;
        vm.$notificationsService = $notificationsService;
        vm.$editorialsService = $editorialService;
        vm.$editorialId = $routeParams.editorialId;
        vm.$location = $location;

        vm.panelHeader = (vm.$editorialId) ? "Loading Editorial #" + vm.$editorialId + ", please wait..." : "Create New Editorial";
        vm.statusOptions = null;

        vm.showEditorialErrors = false;                                                                                 //initialize error display to false
        vm.users = null;
        vm.date = new Date();
        vm.datePickerIsOpen = false;
        vm.editorial = {
            presentationOptions: {},
            status:'1'
        }  
            
        vm.loadUsersSuccess = _loadUsersSuccess;                                                                        //hoist functions so they're publicly available
        vm.loadUsersError = _loadUsersError;
        vm.submitEditorial = _submitEditorial;
        vm.datePickerOpen = _datePickerOpen;
        vm.updateSuccess = _updateSuccess;
        vm.createSuccess = _createSuccess;
        vm.submitError = _submitError;
        vm.loadSuccess = _loadSuccess;
        vm.loadError = _loadError;

        vm.dateOptions = {};


        vm.notify = vm.$usersService.getNotifier($scope);
        vm.notifyEditorial = vm.$editorialsService.getNotifier($scope);

        console.log("editorial id: " + vm.$editorialId);

        _init();

        function _init()
        {
        //  this is loading the options for status dropdown from a c# enum which is rendered as json in a script tag in the view
            vm.statusOptions = JSON.parse($("#editorialStatus").html());        

            renderUsers();
        }

        function renderUsers() {
            vm.$usersService.loadUsers(vm.loadUsersSuccess, vm.loadUsersError);
        }

        function _loadUsersSuccess(data) {                                                                              //load user options to populate editors/designers menus
            vm.notify(function () {
                vm.users = data.items;
            });
            console.log("loading users into editors and designers drop-down menus...");            
            loadEditorial();                                                                                            //make call to get editorial
        }

        function _loadUsersError(jqXhr, error) {
            console.log(error);
        }

        function _datePickerOpen($event) {                                                                              //datepicker function
            vm.datePickerIsOpen = true;
        }

        function _submitEditorial() {                                                                                   //updates/adds editorial
                        
            if (vm.editorialForm.$valid) {

                var req = $.extend(true, {}, vm.editorial);;

                req.presentationOptions = {
                    highlight: vm.editorial.presentationOptions.highlight === true ? true : false,
                    dropDownMenu: vm.editorial.presentationOptions.dropDownMenu === true ? true : false,
                    moreValidImageButton: vm.editorial.presentationOptions.moreValidImageButton === true ? true : false,
                    downloadButton: vm.editorial.presentationOptions.downloadButton === true ? true : false,
                    printButton: vm.editorial.presentationOptions.printButton === true ? true : false,
                    favoriteButton: vm.editorial.presentationOptions.favoriteButton === true ? true : false
                };

                if (req.liveDate)
                    req.liveDate = req.liveDate.getFullYear() + '-' + (req.liveDate.getMonth() + 1) + '-' + req.liveDate.getDate();
                // moment(req).format("YYYY-MM-DD") + ' 00:00:00';

                console.log("send live date", req.liveDate);

                console.log("update", req);
                if (!vm.$editorialId) {                                                                                 //check if editorial id doesn't exist -if true - create
                    vm.$editorialsService.createEditorial(req, vm.createSuccess, vm.submitError);
                   // console.log("adding new editorial...",req);
                }
                else {                                                                                                  //else update existing
                    vm.$editorialsService.updateEditorial(vm.$editorialId, req, vm.updateSuccess, vm.submitError);
                    console.log("updating existing editorial...", req);
                }
            } 
            else {
                vm.showEditorialErrors = true;
            }
        }

        function _createSuccess(response) {                                                                             //on submit success set validation display to false
            vm.showEditorialErrors = false;
            vm.$notificationsService.success("Editorial was added.");
            //function to redirect location to edit mode url route
            var newEditorialId = response.item;                                                                         //store new editorialId for redirect to edit
            console.log("response item: " + response.item);
            setTimeout(function () {
                vm.notify(function () {
                    vm.$location.url('editorial/' + newEditorialId + '/attributes');
                }, 1000);            
            });             
        }

        function _updateSuccess(data) {                                                                                 //on submit success set validation display to false
            vm.showEditorialErrors = false;
            vm.$notificationsService.success("Updates were saved.");
            loadEditorial();
        }

        function _submitError(jqXhr, error) {
            console.log(error);
        }

        function loadEditorial(){                                                                                       //if existing editorial (editorialId > 0) load existing
            if (vm.$editorialId > 0) {                
                vm.$editorialsService.loadRecord(vm.$editorialId, vm.loadSuccess, vm.loadError);
            }
        }

        function _loadSuccess(data) {                                                                                   //on load success set up arrays for editors/designers
            var tempData = data.item;
            console.log('received record: ');
            var editorTemp = [];
            var designerTemp = [];
            if (tempData.editor != null) {
                tempData.editor.forEach(function (arrayItem) {
                    var userID = arrayItem.userID;
                    editorTemp.push(userID);
                });
            }
            if (tempData.designer != null) {
                tempData.designer.forEach(function (arrayItem) {
                    var userID = arrayItem.userID;
                    designerTemp.push(userID);
                });
            }
            
            tempData.status = tempData.status.toString();

            if (tempData.liveDate)
            {
                var x = new Date(tempData.liveDate);
                x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
                tempData.liveDate = x;
            }
                        
            vm.notifyEditorial(function () {
                vm.editorial = tempData;                
                tempData.editor != null? vm.editorial.editor = editorTemp : console.log("no editors");                  //if editors, set to array of UserIDs for chosen
                tempData.designer != null ? vm.editorial.designer = designerTemp : console.log("no designers");         //if designers, set to array of UserIDs for chosen

                vm.panelHeader = vm.editorial.title;

                console.log("editorial data", vm.editorial)
            });            
        }

        function _loadError(jqXhr, error) {
            console.log("an error has occurred: " + error);
        }
        

    }
})();

//---end editorialAttributesController





