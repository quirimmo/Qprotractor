'use strict';

angular.module('myApp')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    let mainState = {
        name: 'main',
        url: '/main',
        templateUrl: 'template/main.html',
        controller: 'MainController'
    };

    $stateProvider.state(mainState);
    $urlRouterProvider.otherwise('main');
}]);