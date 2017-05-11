angular.module('ActivitiesCtrl', ['authServices'])
    .controller('ActivitiesCtrl', function(Auth, $scope, $http, $location, $timeout, $routeParams) {
        $scope.boolean = true;
        this.o = '';
        $scope.limit = 5;
        $scope.contactlist = [];

        $scope.selectedRow = 0;
        $scope.selectedActivity = null;

        $scope.temp1 = null;
        $scope.show = false;
        $scope.errorMsg = false;

        $scope.arr = Auth.getArray();
        console.log($scope.arr);

        $scope.setClickedRow = function(Activity, index) {
            $scope.show = true;

            $scope.selectedRow = index;
            $scope.temp1 = Activity;
            $http.get('/activities/view/' + Activity).then(function(response) {
                $scope.selectedActivity = response.data;
            })
        }
        $scope.rateActivity = function(RatingData, _id) {
            $http.post('/users/createrating/' + _id, RatingData).then(function(res) {
                console.log(RatingData)
            })
        }

        $scope.addToFav = function(_id, Name, index) {
            $http.post('/users/addToFavourites/' + _id).then(function(res) {
                if (res.data.success) {
                    //$scope.boolean = false;
                    $scope.arr.push(index);
                } else {
                    $scope.errorMsg = res.data.message
                    console.log(res.data.message)
                }
            })
        }
        $scope.isInArray = function(value) {
            return $scope.arr.indexOf(value) > -1;
        }

        function getActivities() {
            Auth.getUser().then(function(data) {
                var temp = $routeParams.companyName;
                console.log(temp + " HELLOOO");
                this.o = data.data._doc.username;
                $http.get('/activities/Activities/' + temp).then(function(response) {
                    $scope.contactlist = response.data;
                    $scope.contact = "";
                });
            });

        }
        getActivities();

        $scope.deleteActivity = function(index, _id) {
            $scope.contactlist.splice(index, 1);
            $http.put('/activities/Activities/' + _id).then(function(data) {
                console.log(data);
            })
        }
        $scope.showMore = function(number) {
            showMoreError = false;
            if (number > 0) {
                this.limit = number;
            } else {
                this.showMoreError = "please enter a valid number"
            }
        }
        $scope.showAll = function() {
            this.limit = undefined;
            showMoreError = false;
        }
    });