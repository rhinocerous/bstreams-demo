(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('thumbnailModalController', ThumbnailModalController);

    ThumbnailModalController.$inject = ['$scope'
        , '$baseController'
        , '$newsService'
        , '$notificationsService'
        , '$routeParams'
        , '$location'
        , '$mediaService'
        , '$usersService'
        , '$uibModalInstance'];

    function ThumbnailModalController($scope
        , $baseController
        , $newsService
        , $notificationsService
        , $routeParams
        , $location
        , $mediaService
        , $usersService
        , $uibModalInstance) {

        var vm = this;

        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        vm.$newsService = $newsService;
        vm.$routeParams = $routeParams;
        vm.$mediaService = $mediaService;
        vm.$usersService = $usersService;
        vm.$notificationsService = $notificationsService;
        vm.$uibModalInstance = _$uibModalInstance;



        vm.title = null;
        vm.slug = null;
        vm.inputForm = null;
        vm.currentItems = null;
        vm.showNewArticleErrors = false;
        Dropzone.autoDiscover = false;
       

        vm.newsId = vm.$routeParams.newsId;
        vm.thumbnailImage = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";        
        vm.myDropzone;


        //set up notifier so updates go to vm
        vm.notify = vm.$newsService.getNotifier($scope);

        vm.addArticle = _addArticle;
        vm.addMedia = _addMedia;
               
        vm.onNewsLoadArticle = _onNewsLoadArticle;
        vm.onSuccessAddArticle = _onSuccessAddArticle;
        vm.onErrorAddArticle = _onErrorAddArticle;
        vm.successSubmitNewsMedia = _successSubmitNewsMedia;
        vm.errorSubmitNewsMedia = _errorSubmitNewsMedia;

        render();

        //var modalInstance = vm.$uibModal.open({
        //    animation: true,
        //    templateUrl: '/Scripts/sabio/news/templates/thumbnailImage.html',
        //    controller: 'thumbnailModalController',
        //    windowClass: "modal modal-message fade in modalNg",
        //    controllerAs: 'thumbnail',
        //    size: 'sm',
        //    resolve: {
        //        editorial: function () {
        //            return vm.currentEditorial;
        //        }
        //    }
        //});

        //modalInstance.result.then(function (selectedItem) {
        //    console.log("modal closed", selectedItem)
        //}, function () {
        //    console.log('Modal dismissed at: ' + new Date());
        //});

        function render() {

            if (vm.newsId && vm.newsId > 0) {
                console.log("EDIT mode - go get the data.");
                vm.$newsService.loadArticle(vm.newsId, vm.onNewsLoadArticle, vm.onNewsErrorLoadArticle);
            }
            else {
                console.log("ADD mode - newsId is empty.");
            }
        }

        function _addArticle() {
            if (vm.inputForm.$valid) {
                console.log("Data is valid", vm.currentItems);

                if (vm.newsId && vm.newsId > 0) {
                    Dropzone.options.mediaForm;
                    vm.$newsService.editArticle(vm.newsId, vm.currentItems, vm.onNewsSuccessEditArticle, vm.onNewsErrorEditArticle);
                }
                else {
                    vm.$newsService.addArticle(vm.currentItems, vm.onSuccessAddArticle, vm.onErrorAddArticle);
                }

            } else {
                console.log("Data is invalid");
                vm.$notificationsService.error("Error in adding an article. ");
            }
        }

        function _addMedia() {
            console.log("we are adding media")
            vm.myDropzone.processQueue();
        }

        

        

        function _onNewsLoadArticle(data) {
            vm.notify(function () {
                vm.currentItems = data.item;

                if (vm.currentItems.newsMedia != null) {
                    vm.thumbnailImage = vm.currentItems.newsMedia.mediaFullUrl;
                    console.log("set full url", vm.thumbnailImage);
                }

                console.log("article loaded", data);
            });
        }

       

        function _successSubmitNewsMedia() {
            render();
        }

        function _errorSubmitNewsMedia() {
            console.log("could not submit news media");
        }


        //DropzoneNg code below: For reference: https://gist.github.com/compact/8118670#file-dropzone-directive-js-L26  (files involved: dropzoneNg.js + sabio.module.js)
        vm.myDropzone = {
            'options': {
                // passed into the Dropzone constructor
                'url': '/api/media/create/8/0',
                'autoProcessQueue': false,
                'parallelUploads': 1,
                'maxFiles': 1
            },
            'eventHandlers': {
                'addedfile': function () {
                    var dzMessageElement = angular.element('.dz-message');
                    dzMessageElement.hide();
                },
                'sending': function (file, xhr, formData) {
                },
                'success': function (file, response) {
                    console.log(response);
                    vm.mediaId = response.item;

                    vm.myData = {
                        mediaId: vm.mediaId,
                        newsId: vm.newsId
                    }

                    //update mediaId for media by newsId:
                    vm.$newsService.updateMedia(vm.myData, vm.successSubmitNewsMedia, vm.errorSubmitNewsMedia);

                    vm.myDropzone.removeAllFiles();

                    var dzMessageElement = angular.element('.dz-message');
                    dzMessageElement.show();
                },
                'error': function (file, errorMessage) {
                    console.log("Something went wrong. Please refresh and try again.", errorMessage);
                },
                'maxfilesexceeded': function (file, response) {
                    console.log("Limit 1 media file.", response);
                }
            }
        }

    }
})();

