'use strict';
toDoApp.controller('toDoCtrl', function($scope, flash) {
	$scope.todoName = "";
	$scope.todos = [{
		id: 1,
		name: "Learn angular",
		done: false,
		desc: "Do watch videos"
	}, {
		id: 2,
		name: "Install java",
		done: false,
		desc: "Install JDK First"
	}, {
		id: 3,
		name: 'Buy Iphone',
		done: false,
		desc: "Buy iphone from mall"
	}, {
		id: 4,
		name: "Learn JS",
		done: true,
		desc: "Do something"
	}, {
		id: 5,
		name: "Install IDE",
		done: true,
		desc: "Install JDK First"
	}, {
		id: 6,
		name: 'Buy Laptop',
		done: true,
		desc: "Buy Laptop from mall"
	}];


	$scope.addTodo = function() {
		if ($scope.todoName === "") {
			return false;
		}
		$scope.todos.push({
			name: $scope.todoName,
			desc: "N/A",
			done: false
		});
		$scope.todoName = '';
	}

	$scope.dropSuccessHandler = function(array, item) {
		array.splice(array.indexOf(item), 1);
	};

	$scope.onDrop = function($data, array, status) {
		$data.done = status
		array.push($data);

		flash.pop({
			title: 'Done',
			body: "Success ...",
			type: 'success'
		});

	};



	// Let n be the length of the (sorted) array and 0 < p <= 100 be the desired percentile.
	// If n = 1 return the unique array element (regardless of the value of p); otherwise
	// Compute the estimated percentile position pos = p * (n + 1) / 100 and the difference, d between pos and floor(pos) (i.e. the fractional part of pos).
	// If pos < 1 return the smallest element in the array.
	// Else if pos >= n return the largest element in the array.
	// Else let lower be the element in position floor(pos) in the array and let upper be the next element in the array. Return lower + d * (upper - lower)

	$scope.calc = function(data, percentile) {

		var n = data.length;
		var index, diff, lower, upper, position, result;

		if (n === 1)
			return data[0];

		position = percentile * (n + 1) / 100;

		if (position >= n)
			return data[0];

		diff = position - Math.floor(position);
		lower = data[Math.floor(position)];
		upper = data[Math.floor(position) + 1];
		result = lower + diff * (upper - lower);
		console.log(result);
		return result;

	};
	$scope.calc([43, 54, 56, 61, 62, 66, 68, 69, 69, 70, 71, 72, 77, 78, 79, 85, 87, 88, 89, 93, 95, 96, 98, 99, 99], 50);

});