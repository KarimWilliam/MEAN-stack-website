angular.module('searchCompControllers',[])


.controller('schCompCtrl',function($http,$scope){

var app= this;
//takes data from the user and sends it to backend
this.searchCompAct = function(searchData) {

  console.log('search submitted');
        console.log(this.searchData);
  $http.post('/main/searchComp',this.searchData).then(function(data){

      var count = 0;
      count= data.data.companies.length;

      if(count==0){app.act=1};
      $scope.companies = data.data.companies;

    })
  };


});