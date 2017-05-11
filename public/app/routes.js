angular.module('appRoutes', ['ngRoute', 'myFavouritesctrl', 'subListctrl', 'homectrl'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'homectrl',
                controllerAs: 'homectrl'
            })
            .when('/register', {
                templateUrl: 'app/views/pages/registerMain.html'
            })
            .when('/register1', {
                templateUrl: 'app/views/pages/register.html',
                controller: 'RegisterController',
                controllerAs: 'register1'
            })
            .when('/register2', {
                templateUrl: 'app/views/pages/register2.html',
                controller: 'RegisterCompController',
                controllerAs: 'register2'
            })
            // login page that will use the LoginController
            .when('/login', {
                templateUrl: 'app/views/pages/login.html'
            })
            .when('/adminban', {
                templateUrl: 'app/views/pages/ban.html',
                controller: 'banCtrl',
                controllerAs: "ban"
            })
            .when('/editProfile', {
                templateUrl: 'app/views/pages/edit.html',
                controller: 'Ctrl',
                controllerAs: 'user' //name of controller to be used in my app
            })

        .when('/addToFavourites', {
            templateUrl: 'app/views/pages/fav.html',
            controller: 'Ctrl1',
            controllerAs: 'user1' //name of controller to be used in my app
        })

        .when('/addToSubList/:companyName', {
            templateUrl: 'app/views/pages/sub.html',
            controller: 'Ctrl2',
            controllerAs: 'user2' //name of controller to be used in my app
        })

        .when('/review', {
                templateUrl: 'app/views/pages/Reviews.html',
                controller: 'reviewCtrl',
                controllerAs: "revCtrl"
            })
            .when('/superban', {
                templateUrl: 'app/views/pages/SuperAdminBan.html',
                controller: 'superbanCtrl',
                controllerAs: 'superban' //name of controller to be used in my app
            })

        .when('/superdeban', {
                templateUrl: 'app/views/pages/SuperAdminDeban.html',
                controller: 'superdebanCtrl',
                controllerAs: 'superdeban' //name of controller to be used in my app
            })
            .when('/viewCompanies', {
                templateUrl: 'app/views/pages/companies.html',
                controller: 'compctrl',
                controllerAs: 'compctrl'
            })
            .when('/promote', {
                templateUrl: 'app/views/pages/SuperAdminPromote.html',
                controller: 'promoteCtrl',
                controllerAs: 'promote' //name of controller to be used in my app
            })

        .when('/demote', {
            templateUrl: 'app/views/pages/SuperAdminDemote.html',
            controller: 'demoteCtrl',
            controllerAs: 'demote' //name of controller to be used in my app
        })

        .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })
            .when('/myFavourites', {
                templateUrl: 'app/views/pages/myFavourites.html',
                controller: 'myFavouritesctrl',
                controllerAs: 'myFavouritesctrl'
            })
            .when('/mySubscribers', {
                templateUrl: 'app/views/pages/mySubscriptions.html',
                controller: 'subListctrl',
                controllerAs: 'subListctrl'
            })
            .when('/logout', {
                templateUrl: 'app/views/pages/logout.html'
            })

        //Company add Activities
        .when('/AddActivity', {
            templateUrl: 'app/views/pages/Activity/AddActivity.html',
            controller: 'addActivityCtrl',
            controllerAs: 'addActivityCtrl'
        })

        //Company Gets Activities
        .when('/Activities/:companyName', {
                templateUrl: 'app/views/pages/Activity/Activities.html',
                controller: 'ActivitiesCtrl',
                controllerAs: 'ActivitiesCtrl'
            })
            //Company Gets deleted Activities
            .when('/Trash', {
                templateUrl: 'app/views/pages/Activity/trash.html',
                controller: 'deletedActivityCtrl',
                controllerAs: 'deletedActivityCtrl'
            })
            //editActivity
            .when('/edit/:id', {
                templateUrl: 'app/views/pages/Activity/temp.html',
                controller: 'editActivityCtrl',
                controllerAs: 'editActivityCtrl'
            })
            .when('/reviews', {
                templateUrl: 'app/views/pages/Activity/reviews.html'
            })
            .when('/search', {

                templateUrl: 'app/views/pages/search.html',
                controller: 'schCtrl',
                controllerAs: 'searching'
            })

        .when('/filter', {

                templateUrl: 'app/views/pages/filter.html',
                controller: 'ftrCtrl',
                controllerAs: 'filtering'

            })
            .when('/searchComp', {

                templateUrl: 'app/views/pages/searchComp.html',
                controller: 'schCompCtrl',
                controllerAs: 'searchingComp'

            })

        .when('/searchRate', {

            templateUrl: 'app/views/pages/searchRate.html',
            controller: 'schRateCtrl',
            controllerAs: 'searchingRate'

        })

        .when('/postReview/:companyName', {
                templateUrl: 'app/views/pages/Activity/postReview.html',
                controller: 'postReviewCtrl',
                controllerAs: 'postReviewCtrl'

            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });