angular.module('myFavouritesctrl',[])
.controller('myFavouritesctrl',function($scope,$http)
{
    $scope.favlist=[];
    var o=this;
        
    function favourite()
    {
            console.log("Worked");
            $http.get('/users/myFavourites').then(function(response)
             {
                 console.log(response);
                 if (response.data.success)
             {
                $scope.favlist=response.data.data;
                $scope.fav="";
             }
             else
             {
                o.errorMsg = response.data.msg;
             }
                
            });
    }
favourite();
})