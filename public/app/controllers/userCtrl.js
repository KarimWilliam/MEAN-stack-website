angular.module('userControllers', [])

.controller('Ctrl', function($http) {
    this.regUser = function(regData) {
        console.log(this.regData);
        $http.put('/users/editProfile', this.regData).then(function(data) {
        })
    };
});

//controller to add subscribers to user subscriber list
angular.module('userControllers2', [])
    .controller('Ctrl2', function($scope,$http,$routeParams) {
    var app = $scope;
    function addtoSub()
    {

           var temp = $routeParams.companyName;
           console.log(temp);
            $http.put('/users/addToSubList/'+temp).then(function(res) {
                if (res.data.success) {
                    console.log("ADDED");
                } else {
                    $scope.errorMsg = res.data.message
                    console.log(res.data.message)
                }
            })
    }
    addtoSub();
    });

//controller to add activites to user favorite list
angular.module('userControllers1', [])
    .controller('Ctrl1', function($http) {
        this.fav = function(register) {
            console.log("form submitt");
            console.log(this.register);
            $http.put('/users/addToFavourites', this.register).then(function(data) {
                console.log(data);
            })
        };
    });