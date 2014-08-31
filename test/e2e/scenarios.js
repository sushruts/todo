'use strict';
describe('homeController Test', function () {
    it('User is at default Landing Page', function () {
        browser().navigateTo('/index.html');
        expect(browser().location().url()).toBe('/home');
        sleep(3);
    });
    it('Check user can add text into input box', function () {
        input('todoName').enter('hello');
        sleep(1);
        expect(element('#toDo').val()).toEqual('hello');
        sleep(3);
    });
    it('should add entered item as todo', function () {
        element('#addtoDo').click();
        expect(element('ul#todolist li:last label').text()).toMatch("hello")
        sleep(10);
    });



});
