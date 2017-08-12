'use strict';

angular.module('myApp')
.controller('MainController', ['$scope', function($scope) {

    $scope.username = 'Username Value';

    $scope.maritalStatusList = ['Married', 'Engaged', 'Widower', 'Single'];
    $scope.maritalStatus = 'Single';

    $scope.dogsCheckbox = 'YES';

}]);