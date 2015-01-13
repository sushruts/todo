// http://fengyuanchen.github.io/cropper/#options
toDoApp.directive('cropupload', function($parse, FileUploader, $timeout, $q) {
    var $image = null;
    var uploader = null;
    var cropperModalId = "#cropperModal";
    return {
        restrict: "E",
        replace: true,
        scope:{
            cropperEnabled:'=',
            width:'=',
            height:'=',
            options:'=',
            model : "@",
            file:"@",
            croppedImage : "@",
            myImage : "@"

        },
        templateUrl: 'templates/upload.html',
        controller: function($scope,$attrs) {
            var d = $q.defer();
            $scope.uploader = new FileUploader({
                url: 'abc',
                queueLimit: 2,
                headers: {
                    "Authorization-Token": "Janet"
                }
            });
            
            var handleFileSelect = function(file) {

                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                        if ($scope.cropperEnabled) {
                            $image.cropper("reset", true).cropper("replace", $scope.myImage);
                        }
                    });
                };
                reader.readAsDataURL(file);
            };

            $scope.getCroppedImage = function() {
                $scope.croppedImage = $image.cropper("getDataURL");

                console.log($image.cropper("getData", true));
            };



            // https://gist.github.com/brianfeister/56a1c6c77cd5928a1c53
            /**
             * Upload Blob (cropped image) instead of file.
             * @see
             *   https://developer.mozilla.org/en-US/docs/Web/API/FormData
             *   https://github.com/nervgh/angular-file-upload/issues/208
             */
            $scope.uploader.onBeforeUploadItem = function(item) {
                var blob = dataURItoBlob($scope.croppedImage);
                item._file = blob;
            };

            /**
             * Converts data uri to Blob. Necessary for uploading.
             * @see
             *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
             * @param  {String} dataURI
             * @return {Blob}
             */
            var dataURItoBlob = function(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {
                    type: mimeString
                });
            };



            $scope.uploader.onAfterAddingFile = function(fileItem) {
                if ($scope.uploader.queue.length > 1) $scope.uploader.queue[0].remove();
                $scope.file = $scope.uploader.queue[0]._file;

                var reader = new FileReader();
                reader.onload = function(evt) {
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                        if ($scope.cropperEnabled) {
                            $image.cropper("reset", true).cropper("replace", $scope.myImage);
                        }
                    });
                };
                reader.readAsDataURL($scope.file);
                console.log($scope.uploader.queue[0]);

                // http://getbootstrap.com/javascript/#modals
                $(cropperModalId).modal('show');
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
            return function(scope, element, attrs, controller) {
                if (scope.cropperEnabled) {
                    $image = $(element).find(".img-container > img").cropper(
                        scope.options.cropper
                    );
                }
            };
        }
    };
});