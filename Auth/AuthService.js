app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var serviceBase = 'http://localhost:58839/api/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName : "",
        NomeUsuario: "",
        Roles: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'Usuario/PostPessoa', registration).then(function (response) {
            return response;
        });
    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
//debugger;
        var deferred = $q.defer();

        $http.post(serviceBase + 'Login', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(function (response) {

            response = response.data;
            
            _authentication = response;
            _authentication.NomeUsuario = response.NomeUsuario;
            _authentication.Roles = response.Roles;
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
debugger
            localStorageService.set('authorizationData', _authentication);

            deferred.resolve(response);

        },function (err, status) {
            //alert(err.access_token);
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.token = authData.access_token;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);