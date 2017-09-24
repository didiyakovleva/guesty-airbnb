'use strict';

angular.module('guestyCities.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'guestyCtrl'
    });
}])

.controller('guestyCtrl', function($scope, loadDataFromAirbnb, $timeout, $http, $location) {

    $scope.vouchersData = [];


    $scope.cities = [{
        city: 'London',
        London: 'London'

    }, {
        city: 'Tel-Aviv',
        TelAviv: 'Tel-Aviv'

    }, {
        city: 'New York',
        NewYork: 'New York'

    }, {
        city: 'Paris',
        Paris: 'Paris'

    }];

    $scope.city = $scope.cities[2].city;

    $scope.openDetailsView = function(id, name, address, city) {

        $location.url('/view2/' + id + '/' + name + '/' + address + '/' + city);

    }



   
        loadDataFromAirbnb.getData($scope.cities[2]).then(function(response) {
            $scope.vouchersData = response.data.search_results;

        });
    
});