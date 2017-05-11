angular.module('userControllersOmar',[])

.controller('reviewCtrl',['$http','$scope',function($http,$scope){

var app=this;

$http.get("/review/review").then(function(res){
  $scope.reviews=res.data;
})

  this.revUser = function(Data){
    app.errorMsg = false;  //initially set to false to make the error message box disappear once valid data has been entered.
    console.log('form submitted');
  //  console.log(app.Data)
    $http.post('/review/review',app.Data).then(function(dataa){
      //console.log(dataa.data);
      //create a success message
      if (dataa.data.success){
        app.successMsg = dataa.data.message;
      }else{
        //create an error message
        app.errorMsg=dataa.data.message;
      }
    });
  };





}]);