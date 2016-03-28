//Client-side validation directive --> expire date >= today
(function () {
    "use strict";

    angular.module("validExpire", [])
           .directive('validExpire', validExpire);


    function validExpire() {

        var directive = {
            require: 'ngModel',
            restrict: 'A',
            link: linkExpire
        }

        return directive;


        function linkExpire($scope, $el, $attrs, ctrl) {

            var comparisonModel = $attrs.validExpire;
            var viewValue = 3;

            console.log(comparisonModel);
            console.log(viewValue);

            var validate = function (viewValue) {
                ctrl.$setValidity('validExpire', viewValue < comparisonModel);
            }

            $attrs.$observe('validExpire', function (comparisonModel) {
                return validate(ctrl.$viewValue);
            });

        }
    }

        //    var validate = function (viewValue) {

        //    var comparisonModel = $attrs.validExpire;

        //    if (typeof viewValue === 'undefined' && !comparisonModel) {
        //        ctrl.$setValidity('validExpire', true);
        //    }

        //    if (typeof viewValue === 'object' && !comparisonModel) {
        //        ctrl.$setValidity('validExpire', Date.now() < viewValue.getDate());
        //    }

        //    if (typeof viewValue === 'object' && comparisonModel) {
        //    var dateTime = comparisonModel.replace(/"/g, '');
        //    var myDate = new Date(Date.parse(dateTime));

        //    var expireDateTime = viewValue.replace(/"/g, '');
        //    var myExpireDate = new Date(Date.parse(expireDateTime));
        //    ctrl.$setValidity('validExpire', myExpireDate.getDate() > myDate.getDate());
        //    }

        //    ctrl.$parsers.unshift(validate);
        //    ctrl.$formatters.unshift(validate);

        //    $attrs.$observe('validExpire', function (comparisonModel) {
        //        return validate(ctrl.$viewValue);
        //    });
        //}

    
})();