toDoApp.directive('fileup', function(FileUploader) {
    var template = '<div class="drop-box col-md-4" nv-file-over="" over-class="dragover" uploader="uploader" nv-file-drop="">' +
                                    '<span ng-hide="uploader.queue.length">Drop File Here </span> ' +
                                    '<div ng-repeat = "item in uploader.queue" >' +
                                        '<div ng-show = "uploader.isHTML5" ng-thumb = "{ file: file, height: 20, width:20 }" > </div>' +
                                    '</div> ' +
                                    '<div ng-show = "uploader.queue.length">' +
                                        '<span> {{uploader.queue[0].file.name}} </span>' +
                                        '<span> ' +
                                            '<div class = "progress col-md-2" style = "margin-bottom: 0;" >' +
                                                '<div class="progress-bar"  role = "progressbar"' +
                                                 'ng-style = \'{ "width": uploader.queue[0].progress + "%" }\'> ' +
                                                '</div> ' +
                                            '</div>' +
                                        '</span>' +

                                        '<button type = "button" class ="btn btn-success btn-xs"  ng-click = "uploader.queue[0].upload()"' +
                                            'ng-disabled = "uploader.queue[0].isReady || uploader.queue[0].isUploading || uploader.queue[0].isSuccess" > ' +
                                            '<span class = "glyphicon glyphicon-upload" > < /span>' +
                                        '</button>' +
                                        '<button type = "button"class = "btn btn-danger btn-xs" ng-click = "uploader.queue[0].remove()"> ' +
                                            '<span class = "glyphicon glyphicon-trash" > </span> ' +
                                        '</button>' +
                                   '</div> {{uploader.queue}} {{file}}' +
                                '</div> ';
    return {
        restrict: 'E', 
        replace: true,
        template: template,         
        controller: function($scope) {
             $scope.uploader=null;
             $scope.uploader = new FileUploader({
                    url: 'abc',
                    queueLimit: 2,
                    headers: {
                        "Authorization-Token": "Janet"
                    }
                });
                console.log($scope.uploader.onAfterAddingFile);
                $scope.model = "";
                $scope.file = "";

                $scope.uploader.onAfterAddingFile = function(fileItem) {
                    if ($scope.uploader.queue.length > 1) $scope.uploader.queue[0].remove();
                        $scope.file = $scope.uploader.queue[0]._file;
                    console.log('ko beta maje me ');
                };
                console.log($scope.uploader.onAfterAddingFile);


                $scope.uploader.onCompleteAll = function() {
                    if (!$scope.model.hasError) {
                        d.resolve(true);
                        $timeout(function() {
                            $scope.uploader.clearQueue();
                        }, 300);

                    } else {
                        $scope.model.hasError = false;
                    }
                    console.log('success')
                };

                $scope.uploader.onErrorItem = function(item, response, status, headers) {
                    d.$scopereject(true);
                    $scope.model.hasError = true;
                    $timeout(function() {
                        $scope.uploader.clearQueue();
                    }, 300);
                    console.log('error')
                };
                $scope.uploader.filters.push({
                    name: 'imageFilter',
                    fn: function(item /*{File|FileLikeObject}*/ , options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });

                $scope.$watch('uploader', function(newValue, oldValue) {
                if (newValue)
                    console.log("I see a data change!");
                 });
        },
        link: function(scope, element, attributes) {
            scope.$watch('uploader', function(newValue, oldValue) {
                if (newValue)
                    console.log("I see a data change!");
                 });
           
        }
    }
});

toDoApp.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({
                    width: width,
                    height: height
                });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

toDoApp.directive('intt', ['$timeout',
    function($timeout) {
        var pattern, regexPattern;
        //function to create the pattern
        var createPattern = function(elem, scope) {
            var defaultPattern = "^\\d{0,11}(\\.\\d{0,0})?$",
                defaultErrorMessage = "Number range 0 to 99999999999.999999";
            if (elem.attr("required")) {
                elem.find("a").attr("e-required", "");
            }
            if (!scope.errormessage) {
                scope.errormessage = defaultErrorMessage;
            }
            if (!scope.min) {
                scope.min = 0;
            }
            //temporarily max value is considered as number and not decimal number 
            //because parse float is rounding off above 5 decimal places
            if (!scope.max) {
                scope.max = 99999999999999999;
            }
            //scope.uomPrecision:takes UOM type precion and set decimal precision accordingly
            //scope.min: sets what should be the minimum accepted value by field
            if (scope.uomType && scope.uomPrecision) {
                pattern = "^\\d{0,11}(\\.\\d{0," + scope.uomPrecision + "})?$";
            } else if (scope.patternValue) {
                var places = (scope.patternValue).split("|");
                if (places.length > 1) {
                    pattern = "^\\d{0," + places[0] + "}(\\.\\d{0," + places[1] + "})?$";
                } else {
                    pattern = defaultPattern; //default pattern
                }
            } else {
                pattern = defaultPattern; //default pattern
            }
            pattern = new RegExp(pattern);
            return pattern;
        };
        var removeTrailingZeros = function(val) {
            if (val && val.toString().indexOf(".") > 0) {
                val = val.replace(/[0]+$/, '');
                if (val.slice(-1) === ".") //check if last character is "."
                {
                    val = val.replace(/\.$/, "");
                }
            }
        };

        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                style: '@',
                placeholder: '@',
                min: '@', //min is to define min value to be accepted by the field
                max: '@', //max is to define max value to be accepted by the field
                uomType: '=', //flag to check if UOMPrecision if applicable
                patternValue: '@', // pattern value is "number of digits before decimal|number of digits after decimal
                uomPrecision: '=', //contains UOMPrecision value if UOMPrecision is applicable for decimal places
                errorMessage: '@',
                showerror: '='
            },
            link: function(scope, elem, attr, ngModel) {
                scope.$watch('ngModel', function(newValue, oldValue) {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) {
                        ngModel.$setValidity('intt', false);
                        return;
                    }
                    if (arr.length === 1 && (arr[0] === '.')) {
                        ngModel.$setValidity('intt', true);
                        return;
                    }

                    removeTrailingZeros(newValue);
                    regexPattern = createPattern(elem, scope);
                    //logic to not allow to type leading zeros
                    if (isNaN(newValue) || !regexPattern.test(newValue)) {
                        if (oldValue != undefined) {
                            scope.ngModel = !isNaN(oldValue) ? oldValue : '';
                            console.log('dsd')
                        } else {
                            scope.ngModel = !isNaN(newValue) ? newValue : '';
                            console.log('sds')
                        }
                        ngModel.$setValidity('intt', true);
                        return;
                    } else if (parseFloat(newValue) === 0) {
                        if (arr[0] === '.')
                            scope.ngModel = newValue;
                        else
                            scope.ngModel = '';
                        return;
                    }

                });
                ngModel.$parsers.unshift(function(value) {
                    if ((parseFloat(scope.max) < parseFloat(value)) || (parseFloat(value) < parseFloat(scope.min))) {
                        ngModel.$setValidity('intt', false);
                    } else {
                        ngModel.$setValidity('intt', true);
                    }
                    return value;
                });
            }
        };
    }
]);