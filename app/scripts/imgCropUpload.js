// http://fengyuanchen.github.io/cropper/#options
toDoApp.directive('cropupload', function($parse, FileUploader) {
    var $image = null;
    var uploader = null;
    return {
        restrict: "E",
        replace: true,
        controller: function($scope, $timeout, $q) {
            var d = $q.defer();
            $scope.uploader = new FileUploader({
                url: 'abc',
                queueLimit: 2,
                headers: {
                    "Authorization-Token": "Janet"
                }
            });

            console.log($scope.uploader);

            $scope.model = "";
            $scope.file = "";
            $scope.croppedImage = null;

            $scope.myImage = null;


            var handleFileSelect = function(file) {

                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                        if ($scope.options.cropperEnabled) {
                            $image.cropper("reset", true).cropper("replace", $scope.myImage);
                        }
                    });
                };
                reader.readAsDataURL(file);
            };

            $scope.getCroppedImage = function() {
                $scope.croppedImage = $image.cropper("getDataURL");
                console.log($scope.croppedImage);
            };


            $scope.uploader.onAfterAddingFile = function(fileItem) {
                // test($scope.uploader);

                console.log('ko beta maje me ');
                if ($scope.uploader.queue.length > 1) $scope.uploader.queue[0].remove();
                $scope.file = $scope.uploader.queue[0]._file;
                handleFileSelect($scope.file);

                console.log($scope.file);
            };



            $scope.uploader.onCompleteAll = function() {
                if (!$scope.model.hasError) {
                    d.resolve(true);
                    $timeout(function() {
                        $scope.uploader.clearQueue();
                    }, 300);
                    console.log('success')

                } else {
                    $scope.model.hasError = false;
                }

            };

            $scope.uploader.onErrorItem = function(item, response, status, headers) {

                $scope.model.hasError = true;
                $timeout(function() {
                    $scope.uploader.clearQueue();
                }, 300);
                console.log('error')
                    // d.reject(true);
            };
            $scope.uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });


        },
        compile: function(element, attrs) {
            var modelAccessor = $parse(attrs.ngModel);

            var html = '<div class="drop-box col-md-4"  nv-file-over over-class="dragover" uploader="uploader" >' +
                            '<span ng-hide="uploader.queue.length">Drop File Here </span> ' +
                            '<div ng-show = "uploader.queue.length">' +
                                '<button type = "button" class ="btn btn-success btn-xs"  ng-click = "uploader.queue[0].upload()"' +
                                    'ng-disabled = "uploader.queue[0].isReady || uploader.queue[0].isUploading || uploader.queue[0].isSuccess" > ' +
                                    '<span class = "glyphicon glyphicon-upload" > </span>' +
                                '</button>' +
                                '<button type = "button"class = "btn btn-danger btn-xs" ng-click = "uploader.queue[0].remove()"> ' +
                                    '<span class = "glyphicon glyphicon-trash" > </span> ' +
                                '</button>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div>' +
                                    '<input type="file" id="uplFile" ' +
                                    'nv-file-select="" uploader="uploader"' +
                                    'image="image" />' +
                                '</div>' +
                            '</div>' +
                            '<div img-crop-upload class="img-container">' +
                                '<img  ng-if="options.cropperEnabled" ng-show="myImage!=null" src="{{myImage}}"/>' +
                                '<img  ng-if="!options.cropperEnabled" style="height:auto;width:{{options.width}}px" ng-show="myImage!=null" src="{{myImage}}"/>' +
                            '</div>' +
                            '<button class="btn btn-info" id="getData" ng-click="getCroppedImage()" type="button">Get Data </button>' +
                                '<div class="preview preview-md">' +
                                    '<img ng-show="croppedImage!=null" src="{{croppedImage}}"/>' +
                                '</div>' +
                        '</div> ';
            var newElem = $(html);
            element.replaceWith(newElem);

            return function(scope, element, attrs, controller) {
                if (scope.options.cropperEnabled) {
                    $image = $(element).find(".img-container > img").cropper(
                        scope.options.cropper
                    );
                }
            };

        },
        link: function($scope, element, attributes) {
            $scope.options = attributes.options;
            console.log(attributes);

        }
    };
});