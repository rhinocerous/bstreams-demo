angular.module(APPNAME)
    .directive("scrollOnClick", function () {
        return {
            restrict: "A",
            link: function (scope, $elm) {
                $elm.on("click", function () {
                    $("html, body").animate({ scrollTop: $elm.offset().top - 120 }, 310);
                });
            }
        }
    });

    /*
    .directive('scrollToItem', function () {
        return {
            restrict: 'A',
            scope: {
                scrollTo: "@"
            },
            link: function (scope, $elm, attr) {

                $elm.on('click', function () {
                    $('html,body').animate({ scrollTop: $(scope.scrollTo).offset().top}, "slow");
                });
            }
        }
    });
    */