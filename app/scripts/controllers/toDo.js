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
		// console.log(result);
		return result;

	};
	// $scope.calc([43, 54, 56, 61, 62, 66, 68, 69, 69, 70, 71, 72, 77, 78, 79, 85, 87, 88, 89, 93, 95, 96, 98, 99, 99], 50);


	$scope.arrJ={

		pCat:0,
		RType:"Fast",
		yr:2014,
		comp:[
			{"id":1,"companyName":"Jaxnation","value":1.264},
			{"id":2,"companyName":"Mycat","value":19.2949},
			{"id":3,"companyName":"Feedbug","value":32.2256},
			{"id":4,"companyName":"Zoomdog","value":42.5158},
			{"id":5,"companyName":"Edgeify","value":27.763},
			{"id":6,"companyName":"Quamba","value":25.5804},
			{"id":7,"companyName":"Voolith","value":10.2405},
			{"id":8,"companyName":"Latz","value":5.2437},
			{"id":9,"companyName":"Topicware","value":47.4142},
			{"id":10,"companyName":"Skyndu","value":6.3277},
			{"id":11,"companyName":"Jetwire","value":16.1642},
			{"id":12,"companyName":"Bubblemix","value":11.406},
			{"id":13,"companyName":"Skyvu","value":43.4424},
			{"id":14,"companyName":"Livepath","value":25.2508},
			{"id":15,"companyName":"Yombu","value":22.0579},
			{"id":16,"companyName":"Voolia","value":17.9308},
			{"id":17,"companyName":"Cogibox","value":31.1808},
			{"id":18,"companyName":"Browsedrive","value":40.0064},
			{"id":19,"companyName":"Vimbo","value":39.2314},
			{"id":20,"companyName":"Realcube","value":21.4627},
			{"id":21,"companyName":"Voonte","value":10.7434},
			{"id":22,"companyName":"Quinu","value":24.7835},
			{"id":23,"companyName":"Twinder","value":37.8834},
			{"id":24,"companyName":"Oyondu","value":1.5576},
			{"id":25,"companyName":"Zoomcast","value":46.8848},
			{"id":26,"companyName":"Yodo","value":42.6376},
			{"id":27,"companyName":"Edgeblab","value":40.9438},
			{"id":28,"companyName":"Thoughtworks","value":27.1187},
			{"id":29,"companyName":"Vidoo","value":30.8814},
			{"id":30,"companyName":"Nlounge","value":33.4233},
			{"id":31,"companyName":"Podcat","value":11.6141},
			{"id":32,"companyName":"Tavu","value":5.8023},
			{"id":33,"companyName":"Innojam","value":38.4633},
			{"id":34,"companyName":"Rhycero","value":20.6489},
			{"id":35,"companyName":"Skippad","value":48.7789},
			{"id":36,"companyName":"Blogtag","value":13.5299},
			{"id":37,"companyName":"Gabspot","value":35.9002},
			{"id":38,"companyName":"Yadel","value":7.3886},
			{"id":39,"companyName":"Skimia","value":34.5981},
			{"id":40,"companyName":"Skalith","value":22.8426},
			{"id":41,"companyName":"Edgeblab","value":19.4278},
			{"id":42,"companyName":"Thoughtblab","value":10.2494},
			{"id":43,"companyName":"DabZ","value":18.946},
			{"id":44,"companyName":"Photospace","value":24.3809},
			{"id":45,"companyName":"Dabshots","value":31.8574},
			{"id":46,"companyName":"Zoonder","value":36.778},
			{"id":47,"companyName":"Zoozzy","value":21.0675},
			{"id":48,"companyName":"Jabbertype","value":13.9748},
			{"id":49,"companyName":"Photobean","value":12.7327},
			{"id":50,"companyName":"Snaptags","value":47.0257}
		]		
	};

	function validateValue(value,baseValue,mode){
		if(mode==="asc"){
			if(value>baseValue)
				return true;
		}
		if(mode==="desc"){
			if(value<baseValue)
				return true;
		}
	};

	function append(index,count,arr,order){
		var newItemCount=10-count;
		var newItems=[];		
		for(var i=index-1;i>=index-newItemCount;i--){		
			arr[i]['isExtra']=true;
			newItems.push(arr[i]);
		}
		return newItems;
	};

	$scope.filterIt=function(reqNum,arr,order){
		// console.log(arr);

		if(order=='asc')
			arr.sort(function(a,b) { return a.value - b.value });
		else
			arr.sort(function(a,b) { return b.value - a.value });
		
		
		var result=[],extraItems=[];
		var counter=0;
		var getValues=false;
		var indexOfreqNo=null;
		
		for(var i=0;i<arr.length;i++)
		{	
			if (counter==10)
				break;

			if(indexOfreqNo==null)
			{
				arr[i].value === reqNum ? (indexOfreqNo=i,getValues=true):null;
			}
		
			if(validateValue(arr[i].value,reqNum,order) && counter<=10 && getValues){				
				 counter++
				 result.push(arr[i]);
			}

		}

		if(counter<10){
			extraItems=append(indexOfreqNo,counter,arr,order);
			result=result.concat(extraItems);
		}
		

		console.log(result,counter,indexOfreqNo);
		return result;


	};
	
	$scope.filterIt(7.3886,$scope.arrJ.comp,"asc");


});