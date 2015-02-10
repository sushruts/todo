toDoApp.controller('testCtrl', function($q, $scope, query, $timeout) {

	$scope.ok= function(s){
		console.log(s);

	}
	$scope.getdata = function(q) {		
		var promise = query.loadData(q,'clientName')
		promise.then(function(data) {
			// console.log(data);
			$scope.optionsFromQuery = data;		
		}, function(reason) {

		});
	};
});