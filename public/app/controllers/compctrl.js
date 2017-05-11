angular.module('compctrl',[])
.controller('compctrl',function($scope,$http)
{
    $scope.complist=[];
    $scope.comp="";
    function getComp()
    {
            console.log("Worked");
            $http.get('/users/viewCompanies').then(function(response)
            {
                console.log(response.data);
                $scope.complist=response.data;
            });
    }
getComp();
})