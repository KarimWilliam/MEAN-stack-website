angular.module('homectrl', [])
    .controller('homectrl', function($scope, $http) {

        var sel = $scope;

        $http.post("activities/top").then(function(res) {
            sel.activities = res.data;
            //  console.log(res.data)
            //   console.log(res)
        });

        function getImages() {
            $scope.image1 = 'app/views/pages/images/ahmed.jpg';
            $scope.image2 = 'app/views/pages/images/yehia.jpg';
            $scope.image3 = 'app/views/pages/images/david.jpg';
            $scope.image4 = 'app/views/pages/images/omar.jpg';
            $scope.image5 = 'app/views/pages/images/emad.jpg';
            $scope.image6 = 'app/views/pages/images/ibrahim.jpg';
            $scope.image7 = 'app/views/pages/images/Carol.jpg';
            $scope.image8 = 'app/views/pages/images/kareem.jpg';
            $scope.image9 = 'app/views/pages/images/anas.jpg';
            $scope.image10 = 'app/views/pages/images/test.gif';

        }
        getImages();
    })