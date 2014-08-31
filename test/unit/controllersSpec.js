'use strict';
describe('homeController Test', function() {
    beforeEach(module('toDoApp'));

    it('should return 6 items initially',
          inject(function($rootScope, $controller) {
              var scope = $rootScope.$new();
              var ctrl = $controller("toDoCtrl", {$scope:scope});
              expect(scope.todos.length).toBe(6);

    }));
   it('should add one item and count should increase by 1',
          inject(function($rootScope, $controller) {
              var scope = $rootScope.$new();
              var ctrl = $controller("toDoCtrl", {$scope:scope});
              scope.todoName="sddsd";
              scope.addTodo();
              expect(scope.todos.length).toBe(7);
    }));
});
