'use strict';

angular.module('myApp')

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
        templateUrl: 'template/second-page.html',
        controller: 'SecondPageController'
    };

    $stateProvider.state(mainState);
    $stateProvider.state(secondPageState);
    $urlRouterProvider.otherwise('main');
}]);