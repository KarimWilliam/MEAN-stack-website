angular.module('searchRateControllers', [])


.controller('schRateCtrl', function($http, $scope) {

    var app = this;
    //sends the backend request for activities with the best ratings
    this.searchRateAct = function(searchData) {

        //  console.log('search submitted');
        //      console.log(this.searchData);
        $http.post('/main/searchRate', this.searchData).then(function(data) {

            var count = 0;
            count = data.data.activities.length;

            if (count == 0) { app.act = 1 };
            $scope.activities = data.data.activities;




        })
    };


});