angular.module('RegisterCompCtrl', ['ngRoute']).controller('RegisterCompController', function($scope, $http, $location) {

    var app = $scope;
    var o=this;
    this.regComp = function(compData) {
        //app.errorMsg = false;

        $http.post('/users/registerComp', this.compData).then(function(data) {
            if (data.data.success) {
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