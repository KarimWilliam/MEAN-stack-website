angular.module('RegisterCtrl', ['ngRoute']).controller('RegisterController', function($scope, $http, $location) {

    var app = $scope;
    var o=this;
    this.regUser = function(regData) {
        console.log('Testing button');
       //app.errorMsg = false;

        $http.post('/users/register', this.regData).then(function(data) {
            console.log(data.data.msg);
            if (data.data.success) {
                console.log('Testing button2');
                //Create success message
                o.successMsg = data.data.msg;
                //Redirect to home page
                $location.path('/login');

            } else {
                //create an error message
                o.errorMsg = data.data.msg;
            }
        })
    };
});