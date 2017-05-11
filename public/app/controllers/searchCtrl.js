angular.module('searchControllers',[])


.controller('schCtrl',function($http,$scope){

var app= this;
//takes data from the user and sends it to backend
this.searchAct = function(searchData) {

  console.log('search submitted');
        console.log(this.searchData);
  $http.post('/main/search',this.searchData).then(function(data){

      var count = 0;
      count= data.data.activities.length;

      if(count==0){app.act=1};
      $scope.activities = data.data.activities;



  // app.act = data.data.activities[0].Name;

    })
  };


});