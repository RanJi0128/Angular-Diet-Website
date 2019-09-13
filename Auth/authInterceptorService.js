'use strict';
app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
 
        config.headers = config.headers || {};
 
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            debugger
            config.headers.Authorization = 'Bearer ' + authData.access_token;
           // alert(authData.token);
        }
 
        return config;
    }
 
    var _responseError = function (rejection) {
        //debugger;
        if (rejection.status === 401) {
           // debugger;
            localStorageService.remove('authorizationData');
            $location.path('/login' + '/' + "Ops...Faça login e tente novamente!");
        }
        return $q.reject(rejection);
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
}]);