angular.module('subListctrl',[])
.controller('subListctrl',function($scope,$http)
{
    $scope.sublist=[];
        
    function subs()
    {
            console.log("Worked");
            $http.get('/users/mySubscribers').then(function(response)
            {
                console.log(response.data);
                $scope.sublist=response.data.data;
                $scope.sub="";
            });
    }
subs();
})