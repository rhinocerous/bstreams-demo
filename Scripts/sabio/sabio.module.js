(function () {
    "use strict";

    //  https://github.com/johnpapa/angular-styleguide#modules

    angular.module(APPNAME, [
        'ui.bootstrap',
        'ngRoute',
        'ngAnimate',
        'toastr',
        'angular.chosen',
        'dropzone',
        'dndLists',
        'textAngular',
        'treeControl',
        'textAngular',
        'colorpicker.module',
        'ngWYSIWYG',
        'anguvideo',
        'angularResizable',
        'perfect_scrollbar',
        'beautystreamsEditorialCanvas',
        'beautystreamsEditorialImage',
        'beautystreamsEditorialText',
        'beautystreamsEditorialDivider',
        'beautystreamsEditorialVideo',
        'beautystreamsResizeContentEditor',
        'beautystreamsEditorialImageWithCaption',
        'beautystreamsEditorialButton',
        'beautystreamsEditorialCustomCode'
    ])
    .value('$sabio', sabio.page)
    .directive("csDateToIso", function () {

        // for fixing UTC dates on UIB datepicker - see http://stackoverflow.com/a/27174391
        var linkFunction = function (scope, element, attrs, ngModelCtrl) {

            ngModelCtrl.$parsers.push(function (datepickerValue) {
                return moment(datepickerValue).format("YYYY-MM-DD");
            });
        };

        return {
            restrict: "A",
            require: "ngModel",
            link: linkFunction
        };
    });

})();