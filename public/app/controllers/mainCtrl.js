angular.module('mainCtrl', ['ngRoute', 'authServices']).controller('mainCtrl', function($rootScope, Auth, $timeout, $scope, $http, $location) {
    console.log('hola')
    var app = $scope;
    var o = this;
    $rootScope.$on("$routeChangeStart", function() {
        if (Auth.isLoggedIn()) {
            o.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                o.isCompany = data.data._doc.isCompany;
                o.username = data.data._doc.username;
                o.isSuperAdmin = data.data._doc.isSuperAdmin;
                o.isAdmin = data.data._doc.isAdmin;
                o.email=data.data._doc.email;
            });
        } else {
            o.isLoggedIn = false;
        }
    })


    this.doLogin = function(loginData) {
        console.log("Hello");
        //app.errorMsg = false;
        Auth.login(this.loginData).then(function(data) {
            if (data.data.success) {
                o.successMsg = data.data.msg;
                console.log('error');
                $location.path('/');
            } else {
                o.errorMsg = data.data.msg;
            }
        })
    };

    //loging out 
    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
            app.loginData = ''
        }, 1000)
    }
    this.getReviews = function(Activity) {
        $http.get("/review/review/" + Activity).then(function(res) {

            console.log(res.data);
            $scope.reviews = res.data;
        })
        console.log('hey');
        $location.path('/reviews.html');
        /*$timeout(function() {
            $location.path('/');
            //   app.loginData = ''
        })*/
    }

});