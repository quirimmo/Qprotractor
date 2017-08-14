'use strict';

angular.module('myApp').controller('MainController', ['$scope', function($scope) {

    $scope.username = 'Username Value';

    $scope.maritalStatusList = ['Married', 'Engaged', 'Widower', 'Single'];
    $scope.maritalStatus = 'Single';

    $scope.dogsCheckbox = 'YES';

    $scope.genderRadio = 'Male';

    $scope.disabledField = 'I am a disabled field';
    $scope.enabledField = 'I am an enabled field';

    $scope.hiddenField = 'Hidden field';

    $scope.liveInMyCountry = undefined;

    $scope.tickByContainer = undefined;

    $scope.tableData = [
        {
            firstName: 'Tony',
            lastName: 'Stark',
            age: 40,
            heroName: 'Iron Man'
        },
        {
            firstName: 'Peter',
            lastName: 'Parker',
            age: 25,
            heroName: 'Spiderman'
        },
        {
            firstName: 'Bruce',
            lastName: 'Wayne',
            age: 35,
            heroName: 'Batman'
        }
    ];

}]);