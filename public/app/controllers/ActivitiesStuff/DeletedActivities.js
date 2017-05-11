angular.module('deletedActivityCtrl', ['authServices'])
    .controller('deletedActivityCtrl', function(Auth, $http, $scope) {
        $scope.contactlist = [];
        $scope.limit = 5;
        $scope.selectedRow = 0;
        $scope.selectedActivity = null;

        $scope.temp1 = null;

        $scope.show = false;

        Auth.getUser().then(function(data) {
            this.o = data.data._doc.username;

            $http.get('/activities/trash/' + this.o).then(function(response) {

                $scope.contactlist = response.data;
                console.log(response.data);
                $scope.contact = "";
            });
        })

        $scope.setClickedRow = function(Activity, index) {
            $scope.show = true;

            $scope.selectedRow = index;
            $scope.temp1 = Activity;

            $http.get('/activities/view/' + Activity).then(function(response) {
                $scope.selectedActivity = response.data;

            })

        }
        $scope.deleteActivity = function(_id, index) {

            console.log('hola5');
            // $scope.refresh();
            $scope.contactlist.splice(index, 1);
            $http.put('/activities/update/' + _id);
        }

    });