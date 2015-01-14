toDoApp.controller('fileCtrl', function($scope, $timeout) {
	$scope.aggrId="1234";
	$scope.options = {
		//cropperEnabled: true,
		//width: 390,
		//height: "auto",
		cropper: {

			autoCrop: true,
			data: {
				x: 480,
				y: 60,
				width: 640,
				height: 360
			},
			done: function(data) {

			}

		}


	}

	

});