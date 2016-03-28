//SUBSCRIPTIONS MODAL CONTROLLER
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('subscriptionsModalController', subscriptionsModalController);

    subscriptionsModalController.$inject = ['$scope'
        , '$baseController'
        , '$uibModalInstance'
        , '$subscriptionsService'
        , '$usersService'
        , '$teamsService'
        , '$notificationsService'
        , 'selectedUser'
        , 'selectedTeam'
        , '$route'];

})();

function subscriptionsModalController(
    $scope
    , $baseController
    , $uibModalInstance
    , $subscriptionsService
    , $usersService
    , $teamsService
    , $notificationsService
    , selectedUser
    , selectedTeam
    , $route) {

    //Initial property values
    var vm = this;
    vm.items = null;

    vm.selectedUser = selectedUser;                                     //the user associated with the clicked Subscription button
    vm.selectedTeam = selectedTeam;                                     //the team associated with the clicked Subscription button
    vm.subId = null;                                                    //subscription Id of subscription

    if (selectedTeam) {
        vm.selectedTeam = selectedTeam;
        vm.selectedUser = null;
    }
    else {
        vm.selectedTeam = null;
        vm.selectedUser = selectedUser;
    }

    vm.currentSub = null;
    vm.subAction = null;                                                        //The title of subscription modal window (i.e. Add or Edit)
    vm.subForm = null;                                                          //Form name
    vm.showCurrentSubErrors = false;                                            //Validation errors
    vm.options = [];                                                            //Empty array to later hold users and teams name + Id
    vm.subscriptionTypeOptions = [  
        { 'subscriptionType': 1, 'subscriptionName': 'Prospects' },
        { 'subscriptionType': 2, 'subscriptionName': 'Clients' },
        { 'subscriptionType': 3, 'subscriptionName': 'B-Team' },
    ]

    vm.$subscriptionsService = $subscriptionsService;
    vm.$usersService = $usersService;
    vm.$teamsService = $teamsService;
    vm.$notificationsService = $notificationsService;
    vm.$uibModalInstance = $uibModalInstance;
    vm.$scope = $scope;
    vm.$route = $route;

    //Datepicker stuff
    vm.startDateOpened = false;                                                 //start date Datepicker (false = not displayed)
    vm.expireDateOpened = false;                                                //expire date Datepicker (false = not displayed)

    //  Hoisting functions
    vm.renderSubscriptionByUserOrTeamId = _renderSubscriptionByUserOrTeamId;    //Get existing subscription by User or Team Id
    vm.subLoadSuccess = _subLoadSuccess;                                        //"success" handler for loading a subscription
    vm.userTeamNames = _userTeamNames;                                          //For populating dropdown of User or Team names
    vm.loadUserNameSuccess = _loadUserNameSuccess;                              //"success" handler for loading User names in dropdown
    vm.loadTeamTitleSuccess = _loadTeamTitleSuccess;                            //"success" handler for loading Team titles in dropdown
    vm.addEditSub = _addEditSub;                                                //ng-submit for Create/Edit screen
    vm.subError = _subError;                                                    //"error" handler
    vm.openDatepicker = _openDatepicker;                                        //open datepicker on click
    vm.datepickerFocus = _datepickerFocus;                                      //open datepicker on focus
    vm.trialLength = _trialLength;                                              //auto-inserts expire date as 1 week or 1 month from start date
    vm.selectedPremium = _selectedPremium;                                      //For CREATE, auto-inserts Premium start date = today, expire = 1 year from today


    $baseController.merge(vm, $baseController);                                 //"inheritance"

    vm.notify = vm.$subscriptionsService.getNotifier($scope);

    vm.cancel = function () {
        vm.$uibModalInstance.dismiss('cancel');
    };

    _renderSubscriptionByUserOrTeamId();

    //Retrieves one subscription's info for an EDIT
    //vm.subLoadSuccess can do EDIT or CREATE if no sub exists for that Team/User ID.
    function _renderSubscriptionByUserOrTeamId() {

        if (vm.selectedUser) {
            vm.$subscriptionsService.getSubscriptionByUserId(vm.selectedUser, vm.subLoadSuccess, vm.subError);
            //console.log(vm.selectedUser);

        }
        if (vm.selectedTeam) {
            vm.$subscriptionsService.getSubscriptionByTeamId(vm.selectedTeam, vm.subLoadSuccess, vm.subError);
            console.log("team ", vm.selectedTeam);
        }

    }

    //Loads up a subscription's data onto the form
    function _subLoadSuccess(data, status, settings) {
        var mySub = data.item;

        console.log("data ", data);

        //============== CREATE MODE ==============//
        //Create is the default; If data.item !== null, then subAction will become an Update
        vm.subAction = "Add New Subscription";


        //============== EDIT MODE ==============//
        if (mySub) {

            //Adjusting for timezone - START date
            var oldStartDate = mySub.startDate;
            mySub.startDate = new Date(oldStartDate);
            (mySub.startDate).setMinutes((mySub.startDate).getMinutes() + ((mySub.startDate).getTimezoneOffset()));

            //Adjusting for timezone - EXPIRE date
            var oldExpireDate = mySub.expireDate;
            mySub.expireDate = new Date(oldExpireDate);
            (mySub.expireDate).setMinutes((mySub.expireDate).getMinutes() + ((mySub.expireDate).getTimezoneOffset()));

            //Pre-select "User" or "Team" + name for an existing subscription
            if (mySub.userId) {
                vm.userType = 'user';
                vm.$usersService.loadUsers(vm.loadUserNameSuccess, vm.subError);
                vm.userTeam = mySub.userId;

                if (mySub.startDate == '0001-01-01T00:00:00') {
                    mySub.startDate = null;
                }

                if (mySub.expireDate == '0001-01-01T00:00:00') {
                    mySub.expireDate = null;
                }
            }

            else {
                vm.userType = 'team';
                vm.$teamsService.onTeamsSelectAll(vm.loadTeamTitleSuccess, vm.subError);
                vm.userTeam = mySub.teamId;

                if (mySub.startDate == '0001-01-01T00:00:00') {
                    mySub.startDate = null;
                }

                if (mySub.expireDate == '0001-01-01T00:00:00') {
                    mySub.expireDate = null;
                }
            }

            vm.subId = mySub.subscriptionId;

            if (vm.subId > 0) {
                vm.subAction = "Update Subscription Id #" + vm.subId;
            }
        }

        else {

            //For a Create, selects the clicked user/team's name as the default (but not mandatory select)
            if (vm.selectedUser) {
                vm.userType = 'user';
                vm.$usersService.loadUsers(vm.loadUserNameSuccess, vm.subError);
                vm.userTeam = vm.selectedUser;
            }

            if (vm.selectedTeam) {
                vm.userType = 'team';
                vm.$teamsService.onTeamsSelectAll(vm.loadTeamTitleSuccess, vm.subError);
                vm.userTeam = vm.selectedTeam;
            }
        }

        //vm.$notificationsService.success("Subscription successfully loaded");

        //Tells browser to populate form with these new changes
        vm.notify(function () {
            vm.currentSub = mySub;
            //console.log("current sub ", vm.currentSub);
            //console.log("mySub ", mySub);
        });

    }

    //Gets all user names or team titles from DB
    function _userTeamNames() {
        var userType = vm.userType;
        //depending on selected option of 'User' or 'Team'
        if (userType == 'user') {
            vm.$usersService.loadUsers(vm.loadUserNameSuccess, vm.subError);
        }
        else if (userType == 'team') {
            vm.$teamsService.onTeamsSelectAll(vm.loadTeamTitleSuccess, vm.subError);
        }
    }

    //Populates dropdown with user names
    function _loadUserNameSuccess(data, status, settings) {
        var userOptions = [];

        for (var i = 0; i < data.items.length; i++) {
            var userName = data.items[i].firstName + " " + data.items[i].lastName;
            var userId = data.items[i].userID;

            userOptions.push({
                name: userName,
                value: userId
            });
        }

        vm.notify(function () {
            vm.options = userOptions;
        });
       // console.log("User names successfully loaded", vm.options);

    }

    //Populates dropdown with user names
    function _loadTeamTitleSuccess(data, status, settings) {

        var teamOptions = [];

        for (var j = 0; j < data.items.length; j++) {
            var teamTitle = data.items[j].title;
            var teamId = data.items[j].teamsId;

            teamOptions.push({
                name: teamTitle,
                value: teamId
            });
        }

        vm.notify(function () {
            vm.options = teamOptions;
        });
        //console.log("Team titles successfully loaded", vm.options);
    }

    function _addEditSub() {
        vm.showCurrentSubErrors = true;

        if (vm.currentSub.startDate && vm.currentSub.expireDate) {
            //Reformatting date selection via moment to be C#-friendly
            var startDateReformat = moment(vm.currentSub.startDate).format("MM-DD-YYYY");
            var expireDateReformat = moment(vm.currentSub.expireDate).format("MM-DD-YYYY");
            vm.currentSub.startDate = new Date(startDateReformat);
            vm.currentSub.expireDate = new Date(expireDateReformat);
        }


        if (vm.userType == "user") {
            vm.currentSub.userId = vm.userTeam;
            vm.currentSub.teamId = null;
        }
        else {
            vm.currentSub.userId = null;
            vm.currentSub.teamId = vm.userTeam;
        }

        if (vm.subForm.$valid) {
           // console.log(vm.subId);

            //UPDATE
            if (vm.subId > 0) {
                vm.$subscriptionsService.updateSubscription(vm.subId, vm.currentSub, vm.ok, vm.subError);
                vm.$notificationsService.success("Subscription successfully updated!");
               // console.log("Subscription updated", vm.currentSub);
            }

                //CREATE
            else {
                vm.$subscriptionsService.createSubscription(vm.currentSub, vm.ok, vm.subError);
                vm.$notificationsService.success("New subscription successfully created!");
                
                //console.log("Data is valid. Subscription created:", vm.currentSub);
            }
        }
        else {
            //console.log("Invalid data.");
        }
    }

    //On success, dismisses the modal window
    vm.ok = function () {
        vm.$uibModalInstance.dismiss(vm.currentSub);
        $route.reload();
        //console.log("Submit successful: " + JSON.stringify(vm.currentSub));
    }

    //On error
    function _subError(ajax, status, errorThrown) {
        vm.$notificationsService.error("Subscription request error: " + errorThrown);
    }

    //opens start or expire date pickers on click
    function _openDatepicker($event, dateType) {
        if (dateType == 'startDate') {
            vm.startDateOpened = true;
        }
        if (dateType == 'expireDate') {
            vm.expireDateOpened = true;
        }
    }

    //opens start or expire date picker on focus
    function _datepickerFocus($event, dateType) {
        if (dateType == 'startDate') {
            vm.startDateOpened = true;
            vm.expireDateOpened = false;

        }
        if (dateType == 'expireDate') {
            vm.startDateOpened = false;
            vm.expireDateOpened = true;
        }
    }

    //Adds 1 week or 1 month to Trial Start Date + auto inputs it into Expire Date field
    function _trialLength(length) {
        
        if (length == 'week') {
            var expireDate = new Date(vm.currentSub.startDate);
            expireDate.setDate(expireDate.getDate() + 7)
        }

        if (length == 'month') {
            var expireDate = new Date(vm.currentSub.startDate);
            expireDate.setMonth(expireDate.getMonth() + 1)
        }

        vm.currentSub.expireDate = expireDate;
    }

    function _selectedPremium() {

        if (vm.currentSub.subscriptionType == 2) {

            vm.currentSub = {
                startDate: new Date(),
                expireDate: new Date(),
                subscriptionType: 2
            }
            vm.currentSub.expireDate.setYear((vm.currentSub.expireDate).getFullYear() + 1);
        }

        if (vm.currentSub.subscriptionType == 1) {

            vm.currentSub = {
                startDate: null,
                expireDate: null,
                subscriptionType: 1
            }
        }
    }

}