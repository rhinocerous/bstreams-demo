(function () {                                                                                                
    "use strict";

    angular.module(APPNAME)
        .controller('newsCreateController', NewsCreateController);

    NewsCreateController.$inject = ['$scope'
        , '$baseController'
        , '$newsService'
        , '$notificationsService'
        , '$routeParams'
        , '$location'
        , '$mediaService'
        , '$usersService'];

    function NewsCreateController($scope
        , $baseController
        , $newsService
        , $notificationsService
        , $routeParams
        , $location
        , $mediaService
        , $usersService) {

        var vm = this;

        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;        
        vm.$newsService = $newsService;
        vm.$routeParams = $routeParams;
        vm.mediaService = $mediaService;
        vm.usersService = $usersService;
        vm.$notificationsService = $notificationsService;

        
        
        vm.title = null;
        vm.slug = null;
        vm.inputForm = null;
        vm.currentItems = null;
        vm.showNewArticleErrors = false;
        $scope.isCollapsed = true;
        Dropzone.autoDiscover = false;
        vm.isDisabledSlug = false;

        vm.newsId = vm.$routeParams.newsId;
        vm.thumbnailImage = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";
        vm.highlightImage = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";
        vm.copyImage = "http://sabio-training.s3.amazonaws.com/C13/20162583052_noimage.png";
        vm.myDropzone;
        vm.myDropzone1;
        vm.myDropzone2;

        //set up notifier so updates go to vm
        vm.notify = vm.$newsService.getNotifier($scope);

        vm.addArticle = _addArticle;
        vm.addMedia = _addMedia;
        vm.addMediaHighlight = _addMediaHighlight;
        vm.addMediaCopy = _addMediaCopy;
        vm.onNewsLoadArticle = _onNewsLoadArticle;
        vm.keyUpSlug = _keyUpSlug;

        vm.onNewsSuccessEditArticle = _onNewsSuccessEditArticle;
        vm.onNewsErrorEditArticle = _onNewsErrorEditArticle;
        vm.onSuccessAddArticle = _onSuccessAddArticle;
        vm.onErrorAddArticle = _onErrorAddArticle;
        vm.successSubmitNewsMedia = _successSubmitNewsMedia;
        vm.errorSubmitNewsMedia = _errorSubmitNewsMedia;

       
        $scope.editorConfig = {
            sanitize: false,
            toolbar: [
                { name: 'basicStyling', items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-'] },
                { name: 'paragraph', items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-'] },
                { name: 'doers', items: ['removeFormatting', 'undo', 'redo', '-'] },
                { name: 'colors', items: ['fontColor', 'backgroundColor', '-'] },
                { name: 'links', items: ['hr', 'symbols', 'link', 'unlink', '-'] },
                { name: 'tools', items: ['print', '-'] },
                { name: 'styling', items: ['font', 'size', 'format'] },
            ]
        };

        render();

        function render() {

            if (vm.newsId && vm.newsId > 0) {
                console.log("EDIT mode - go get the data.");

                var displayMediaContainer = angular.element("#displayMediaContainer");
                var thumbnail = angular.element(".thumbnail");
                var button1 = angular.element("#button1");
                var button2 = angular.element("#button2");
                displayMediaContainer.removeClass("hidden");
                thumbnail.removeClass("hidden");
                button1.removeClass("hidden");
                button2.removeClass("hidden");

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

        function _addMediaHighlight() {
            console.log("we are adding media")
            vm.myDropzone.processQueue();
        }

        function _addMediaCopy() {
            console.log("we are adding media")
            vm.myDropzone2.processQueue();
        }

        function _onSuccessAddArticle(data) {
            vm.$notificationsService.success("Article has been successfully added!");
        }


        function _onNewsSuccessEditArticle(data) {
                    vm.$notificationsService.success("Article has been successfully updated!");
        }

        function _onNewsErrorEditArticle(data) { 
                    vm.$notificationsService.error("Article was not updated.");
        }

        function _onErrorAddArticle(jqXhr, error) {
            vm.$notificationsService.error("Error in adding the Article.");
        }

        function _onNewsLoadArticle(data) {
            vm.notify(function () {
                vm.currentItems = data.item;

                if (vm.currentItems.newsMedia != null) {
                    vm.thumbnailImage = vm.currentItems.newsMedia.mediaFullUrl;                   
                    console.log("set full url", vm.thumbnailImage);
                }

                if (vm.currentItems.newsMediaHighlight != null) {
                    vm.highlightImage = vm.currentItems.newsMediaHighlight.mediaFullUrl;
                    console.log("set full url", vm.highlightImage);
                }

                if (vm.currentItems.newsMediaCopy != null) {
                    vm.copyImage = vm.currentItems.newsMediaCopy.mediaFullUrl;
                     console.log("set full url", vm.copyImage);
                }

                console.log("article loaded", data);
            });
        }

        function _onNewsErrorLoadArticle() {
            console.log("We could not load the article");
        }

        function _successSubmitNewsMedia() {
            render();
        }

        function _errorSubmitNewsMedia() {
            console.log("could not submit news media");
        }
        
        function _keyUpSlug() {
            if (vm.currentItems.title == null) {

            }
            else {
                var slug = vm.currentItems.title.replace(/\W+/g, '-').toLowerCase();

                vm.currentItems.slug = slug;
            }
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

        //vm.myDropzone1 = {
        //    'options': {
        //         passed into the Dropzone constructor
        //        'url': '/api/media/create/9/0',
        //        'autoProcessQueue': false,
        //        'parallelUploads': 1,
        //        'maxFiles': 1
        //    },
        //    'eventHandlers': {
        //        'addedfile': function () {
        //            var dzMessageElement = angular.element('.dz-message');
        //            dzMessageElement.hide();
        //        },
        //        'sending': function (file, xhr, formData) {
        //        },
        //        'success': function (file, response) {
        //            console.log(response);
        //            vm.mediaId = response.item;

        //            vm.myData = {
        //                mediaId: vm.mediaId,
        //                newsId: vm.newsId
        //            }

        //            update mediaId for media by newsId:
        //            vm.$newsService.updateMediaHighlight(vm.myData, vm.successSubmitNewsMedia, vm.errorSubmitNewsMedia);

        //            vm.myDropzone1.removeAllFiles();

        //            var dzMessageElement = angular.element('.dz-message');
        //            dzMessageElement.show();
        //        },
        //        'error': function (file, errorMessage) {
        //            console.log("Something went wrong. Please refresh and try again.", errorMessage);
        //        },
        //        'maxfilesexceeded': function (file, response) {
        //            console.log("Limit 1 media file.", response);
        //        }
        //    }
        //}

        //vm.myDropzone = {
        //    'options': {
        //        // passed into the Dropzone constructor
        //        'url': '/api/media/create/10/0',
        //        'autoProcessQueue': false,
        //        'parallelUploads': 1,
        //        'maxFiles': 1
        //    },
        //    'eventHandlers': {
        //        'addedfile': function () {
        //            var dzMessageElement = angular.element('.dz-message');
        //            dzMessageElement.hide();
        //        },
        //        'sending': function (file, xhr, formData) {
        //        },
        //        'success': function (file, response) {
        //            console.log(response);
        //            vm.mediaId = response.item;

        //            //update mediaId for teams by teamsID:
        //            vm.$teamsService.onTeamsUpdateMediaId(vm.successSubmitTeamsMedia, vm.errorSubmitTeamsMedia, vm.$teamsId, vm.mediaId);

        //            vm.myDropzone.removeAllFiles();

        //            var dzMessageElement = angular.element('.dz-message');
        //            dzMessageElement.show();
        //        },
        //        'error': function (file, errorMessage) {
        //            console.log("Something went wrong. Please refresh and try again.", errorMessage);
        //        },
        //        'maxfilesexceeded': function (file, response) {
        //            console.log("Limit 1 media file.", response);
        //        }
        //    }
        //}


    }
})();

