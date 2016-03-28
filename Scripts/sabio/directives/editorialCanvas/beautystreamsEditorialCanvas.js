(function () {
    "use strict";

    angular.module("beautystreamsEditorialCanvas", [])
        .directive('beautystreamsEditorialCanvas', EditorialCanvas);


    function EditorialCanvas() {

        var directive = {
            restrict: 'A',
            scope: { fabricOptions: '=fabricOptions' },
            template: "<canvas id='editorial-canvas-base' />",
            link: linkFx
        }

        return directive;

        function linkFx(scope, el, attrs) {


            var layer = el.find('canvas')[0];

            scope.canvas = new fabric.Canvas(layer);
            scope.canvas.setHeight(el.height());
            scope.canvas.setWidth(el.width());

            scope.$watch('fabricOptions.background.fullUrl', function (newVal) {
                if (typeof newVal === 'string') {

                    console.log("got new background url: ", newVal)

                    var img = new Image();
                    img.onload = function () {
                        scope.canvas.setBackgroundImage(this.src, scope.canvas.renderAll.bind(scope.canvas));

                        var w = this.width;
                        var h = this.height;

                        scope.canvas.setHeight(h);
                        scope.canvas.setWidth(w);


                        var svgEl = document.body.getElementsByTagName('svg')[0];
                        var serializer = new XMLSerializer();
                        var svgStr = serializer.serializeToString(svgEl);

                        var path = fabric.loadSVGFromString(svgStr, function (objects, options) {

                            var obj = fabric.util.groupSVGElements(objects, options);
                            obj.scaleToHeight(h - 10)
                              .set({ left: (w - obj.currentWidth) / 2, top: (h - obj.currentHeight) / 2 })
                              .setCoords();

                            console.log("object for render", obj)

                            scope.canvas.add(obj).renderAll();
                        });

                    }
                    img.src = newVal;
                }
            });
        }
    };


})();