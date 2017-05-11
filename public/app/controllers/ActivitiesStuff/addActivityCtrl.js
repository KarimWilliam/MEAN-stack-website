angular.module('addActivityCtrl', [])
    .controller('addActivityCtrl', function($http, $location, $timeout) {

        var app = this
        this.addActivity = function(regData, bb) {
            app.errorMsg = false;
            //console.log(bb);
            this.regData.username = bb;

            console.log(this.regData);
            $http.post('/activities/addActivities/', this.regData).then(function(data) {
                if (data.data.success) {
                    //once data is inserted
                    app.successMsg = data.data.message + "....Redirecting";
                    //redirecting
                    $timeout(function() {
                        $location.path('/');
                    }, 2000);
                } else {
                    app.errorMsg = data.data.message
                }
            });
        }
    });