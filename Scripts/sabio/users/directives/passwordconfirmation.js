angular.module(APPNAME)
    .directive("pwCheck", function () {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs, ctrl) {
                var Password = "#" + attrs.pwCheck;
                $(elem).add(Password).on("keyup", function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(Password).val();
                        ctrl.$setValidity("pwcheck", v);
                    });
                });
            }
        }
    });