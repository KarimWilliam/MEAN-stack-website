angular.module('filterControllers',[])


.controller('ftrCtrl',function($http,$scope){

  var app= this;
//takes data from the user and sends it to backend to get filltered
this.filterAct = function(filterData) {
  console.log('filter submitted');
    console.log(this.filterData)
      console.log(this.searchData);
      $http.post('/main/filter',this.filterData).then(function(data){
    console.log(data.data.company);


    $scope.companies = data.data.company;

    var count = 0;
    count= data.data.company.length;

    if(count==0){app.comp=1};

        })
  };
});