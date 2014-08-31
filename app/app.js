'use strict';
var toDoApp = angular.module("toDoApp", ['ui.compat', 'ngDraggable']);
toDoApp.config(["$stateProvider", "$routeProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $routeProvider, $urlRouterProvider, $locationProvide) {
        $urlRouterProvider.otherwise("/home");
        $routeProvider.when("/home", {
            templateUrl: "home.html",
            controller: "toDoCtrl",
            title: "Home"
        });
    }]);


