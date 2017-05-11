angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    var authFactory = [];
    var q = new Array(0);
    //UserLogin
    authFactory.login = function(loginData) {
            return $http.post('/users/login', loginData).then(function(data) {
                AuthToken.setToken(data.data.token);
                return data;
            });
        }
        //Auth is LoggedIn;
    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }
    authFactory.getUser = function() {
        if (AuthToken.getToken()) {
            return $http.post('/users/me')
        } else {
            $q.reject({ message: 'User has no token' })
        }
    }

    authFactory.logout = function(token) {
        q = new Array(0);
        AuthToken.setToken();
    }

    authFactory.getArray = function() {
        return q;
    }

    return authFactory;
})


.factory('AuthToken', function($window) {
    var authFactory = [];

    authFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');

        }
    }

    authFactory.getToken = function() {
        // console.log($window.localStorage.getItem('token'));
        return $window.localStorage.getItem('token');
    }


    return authFactory;
})



.factory('AuthInterceptors', function(AuthToken) {
    var auth = [];

    auth.request = function(config) {
        var token = AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    };

    return auth;
});