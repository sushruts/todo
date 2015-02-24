toDoApp.controller('testCtrl', function($q, $http, $scope, query, $timeout) {

	$scope.ok = function(s) {
		console.log(s);

	}
	$scope.getdata = function(q, mdl) {
		var promise = query.loadData(q, 'clientName')
		promise.then(function(data) {
			// console.log(data);
			data = data.concat(mdl);
			$scope.optionsFromQuery = data;
		}, function(reason) {

		});
	};

	$scope.getLocation = function(val) {
		return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address: val,
				sensor: false
			}
		}).then(function(response) {
			var d = response.data.results.map(function(item) {				
				return item.formatted_address;
			});
			console.log(d.length);
			return d
		});
	};

});