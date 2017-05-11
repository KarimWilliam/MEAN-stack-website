angular.module('postReviewCtrl', ['authServices'])
    .controller('postReviewCtrl', function($timeout,$location,$routeParams, Auth, $scope, $http) {
        $scope.contactlist='';
        $scope.contact='';
        $scope.revUser = function(Data) {
            // console.log('hey');
            $scope.errorMsg = false; //initially set to false to make the error message box disappear once valid data has been entered.
            //  console.log(Data)
            var c = $routeParams.companyName;
            $http.post('/users/review/' + c, this.Data).then(function(dataa) {
                if (dataa.data.success) {
                    console.log(dataa.data.message);
                    $scope.successMsg = dataa.data.message;
                     $timeout(function() {
                         $location.path('/');
                         }, 500)

                } else {
                    //create an error message
                    $scope.errorMsg = dataa.data.message;
                    console.log($scope.errorMsg);
                   
                }
            });
        }

         function getReviews() {
            var temp = $routeParams.companyName;
                        $http.get("/review/review/" + temp).then(function(res) {
                            console.log(res.data)
                             $scope.contactlist = res.data;
                              $scope.contact = "";
                        });
        }
        getReviews();


    });