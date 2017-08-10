'use strict';

angular.module('myApp', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    var mainState = {
        name: 'main',
        url: '/main',
        templateUrl: 'template/main.html',
        controller: 'MainController'
    };
    var secondPageState = {
        name: 'second-page',
        url: '/second-page',
        templateUrl: 'template/second-page.html'
    };
    // $routeProvider.when('/', {
    //     templateUrl: 'template/main.html'
    //         // controller: 'View1Ctrl'
    // }).otherwise({redirectTo: '/'});

    $stateProvider.state(mainState);
    $stateProvider.state(secondPageState);
    $urlRouterProvider.otherwise('main');
}]);