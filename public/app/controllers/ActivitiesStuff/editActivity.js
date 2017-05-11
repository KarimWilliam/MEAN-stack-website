angular.module('editActivityCtrl', ['authServices'])
    .controller('editActivityCtrl', function(Auth, $scope, $http, $location, $timeout,$routeParams) {

        $scope.nameTab = 'active';
        $scope.phase1 = true;
        $scope.selectedName = '';

        //for mastering the viewing of err/success msgs
        this.errorMsg1 = false;
        this.errorMsg2 = false;
        this.errorMsg3 = false;
        this.errorMsg4 = false;


        this.successMsg1 = false;
        this.successMsg2 = false;
        this.successMsg3 = false;
        this.successMsg4 = false;


        $scope.namePhase = function() {
            $scope.nameTab = 'active';
            $scope.Description = 'default'
            $scope.EndDateTab = 'default'
            $scope.LocationTab = 'default'

            $scope.phase1 = true;
            $scope.phase2 = false;
            $scope.phase3 = false;
            $scope.phase4 = false;


            this.errorMsg1 = false;
            this.errorMsg2 = false;
            this.errorMsg3 = false;
            this.errorMsg4 = false;


            this.successMsg2 = false;
            this.successMsg3 = false;
            this.successMsg4 = false;

        }
        $scope.DescriptionPhase = function() {
            $scope.nameTab = 'default';
            $scope.DescriptionTab = 'active'
            $scope.EndDateTab = 'default'
            $scope.LocationTab = 'default'

            $scope.phase1 = false;
            $scope.phase2 = true;
            $scope.phase3 = false;
            $scope.phase4 = false;

            this.errorMsg1 = false;
            this.errorMsg3 = false;
            this.errorMsg4 = false;

            this.successMsg1 = false;
            this.successMsg3 = false;
            this.successMsg4 = false;

        }
        $scope.EndDatePhase = function() {
            $scope.nameTab = 'default';
            $scope.DescriptionTab = 'default'
            $scope.EndDateTab = 'active'
            $scope.LocationTab = 'default'

            $scope.phase1 = false;
            $scope.phase2 = false;
            $scope.phase3 = true;
            $scope.phase4 = false;

            this.errorMsg1 = false;
            this.errorMsg2 = false;
            this.errorMsg4 = false;


            this.successMsg1 = false;
            this.successMsg2 = false;
            this.successMsg4 = false;
        }
        $scope.LocationPhase = function() {
            $scope.nameTab = 'default';
            $scope.DescriptionTab = 'default'
            $scope.EndDateTab = 'default'
            $scope.LocationTab = 'active'

            $scope.phase1 = false;
            $scope.phase2 = false;
            $scope.phase3 = false;
            $scope.phase4 = true;

            this.errorMsg1 = false;
            this.errorMsg2 = false;
            this.errorMsg3 = false;


            this.successMsg1 = false;
            this.successMsg2 = false;
            this.successMsg3 = false;
        }

        okok = function() {
            var temp = $routeParams.id;
            $http.get('/activities/view/' + temp).then(function(response) {


                $scope.selectedName = response.data[0].Name;
                //to get all content of Activity before editing
                $scope.bb = response.data[0].Name;
                $scope.des = response.data[0].desc;
                $scope.num = response.data[0].numberOfApplicatons;
                $scope.loc = response.data[0].location;

            })
        }
        okok();

        //for updating the name
        $scope.updateName = function(regData) {
            var id = $routeParams.id;
            $http.post('/activities/editName/' + id, this.regData).then(function(data) {
                if (data.data.success) {
                    $scope.successMsg1 = data.data.message;
                } else {
                    $scope.errorMsg1 = data.data.message;
                }
            });
        }

        //for updating the description
        $scope.updateDesc = function(regData) {
                var id = $routeParams.id;
                $http.post('/activities/editDesc/' + id, this.regData).then(function(data) {
                    if (data.data.success) {
                        $scope.successMsg2 = data.data.message;
                    } else {

                        $scope.errorMsg2 = data.data.message;
                        console.log($scope.errorMsg2);

                    }

                });
            }
            //for updating the description
        $scope.updateNum = function(regData) {
                var id = $routeParams.id;
                $http.post('/activities/editNum/' + id, this.regData).then(function(data) {
                    if (data.data.success) {
                        $scope.successMsg3 = data.data.message;
                    } else {
                        $scope.errorMsg3 = data.data.message;
                    }

                });
            }
            //for updating the description
        $scope.updateLoc = function(regData) {
            var id = $routeParams.id;
            $http.post('/activities/editLoc/' + id, this.regData).then(function(data) {
                if (data.data.success) {
                    $scope.successMsg4 = data.data.message;
                } else {

                    console.log('hola from error')
                    $scope.errorMsg4 = data.data.message;
                }

            });
        }
        $scope.doTheBack = function() {
            window.history.back();
        };

    })