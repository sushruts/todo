'use strict';
var toDoApp = angular.module("toDoApp", ['ui.compat', 'ngDraggable', 'angularFileUpload','ngImgCrop','ngDialog','tc.chartjs','localytics.directives']);
toDoApp.config(["$stateProvider", "$routeProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $routeProvider, $urlRouterProvider, $locationProvide) {
    $urlRouterProvider.otherwise("/home");
    $routeProvider.when("/home", {
        templateUrl: "home.html",
        controller: "toDoCtrl",
        title: "Home"
    });
    $routeProvider.when("/test", {
        templateUrl: "test.html",
        title: "Testing"
    });
    $routeProvider.when("/file", {
        templateUrl: "fileUpload.html",
        title: "Testing"
    });
    $routeProvider.when("/chart", {
        templateUrl: "chart.html",
        title: "Charts"
    });
}]);