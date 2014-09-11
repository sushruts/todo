'use strict';
toDoApp.service('commonService', function ($http, $location, $rootScope, $q) {
    var invalidMsgList = [];
    return {
        ajaxCall: function remoteCall(type, url, reqData) {
            var deferred = $q.defer();
            $http({
                method: type,
                url: url,
                data: reqData
            }).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
				error(function (data, status, headers, config) {
				    if (status == 500)
				        deferred.reject({
				            'data': 'Please try after some time.',
				            'status': status
				        });
				    else
				        deferred.reject({
				            'data': data,
				            'status': status
				        });
				})
            return deferred.promise;
        }
    }
});
toDoApp.factory("flash", function ($rootScope) {

    var queue = [], currentMessage = {};

    $rootScope.$on('$routeChangeSuccess', function () {
        if (queue.length > 0)
            currentMessage = queue.shift();
        else
            currentMessage = {};
    });

    return {
        set: function (message) {
            var msg = message;
            queue.push(msg);
        },

        get: function (message) {
            return currentMessage;
        },

        pop: function (message) {
            switch (message.type) {
                case 'success':
                    toastr.success(message.body, message.title, message.options);
                    break;
                case 'info':
                    toastr.info(message.body, message.title, message.options);
                    break;
                case 'warning':
                    toastr.warning(message.body, message.title, message.options);
                    break;
                case 'error':
                    toastr.error(message.body, message.title, message.options);
                    break;
            }
        }
    };
});