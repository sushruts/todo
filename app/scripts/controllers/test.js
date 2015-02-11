toDoApp.controller('testCtrl', function($q, $scope, query, $timeout) {

	$scope.ok= function(s){
		console.log(s);

	}
	$scope.getdata = function(q,mdl) {		
		var promise = query.loadData(q,'clientName')
		promise.then(function(data) {
			// console.log(data);
			data=data.concat(mdl);
			$scope.optionsFromQuery = data;		
		}, function(reason) {

		});
	};
});