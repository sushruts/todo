'use strict';
toDoApp.controller('toDoCtrl', function ($scope,flash) {
    $scope.todoName = "";
    $scope.todos = [{
        id: 1,
        name: "Learn angular",
        done: false,
        desc: "Do watch videos"
    },
        {
            id: 2,
            name: "Install java",
            done: false,
            desc: "Install JDK First"
        },
        {
            id: 3,
            name: 'Buy Iphone',
            done: false,
            desc: "Buy iphone from mall"
        },
        {
            id: 4,
            name: "Learn JS",
            done: true,
            desc: "Do something"
        },
        {
            id: 5,
            name: "Install IDE",
            done: true,
            desc: "Install JDK First"
        },
        {
            id: 6,
            name: 'Buy Laptop',
            done: true,
            desc: "Buy Laptop from mall"
        }];


    $scope.addTodo = function () {
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

    $scope.dropSuccessHandler = function (array, item) {
        array.splice(array.indexOf(item), 1);
    };

    $scope.onDrop = function ($data, array, status) {
        $data.done = status
        array.push($data);

        flash.pop({
                    title: 'Done',
                    body: "Success ...",
                    type: 'success'
                });

    };



});
