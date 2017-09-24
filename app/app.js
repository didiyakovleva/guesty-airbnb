'use strict';

// Declare app level module which depends on views, and components


angular.module('guestyCities', [
    'ngRoute',

    'guestyCities.view1',
    'guestyCities.view2',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}])




.directive('dropdown', function($timeout, loadDataFromAirbnb) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            list: '=dropdown',
            ngModel: '='
        },
        templateUrl: '/dropbox.html',
        replace: true,
        controller: function() {},
        link: function($scope, elem, attrs, ngModel) {
            $scope.height = elem[0].offsetHeight;
            $scope.$watch('ngModel', function() {
                $scope.selected = ngModel.$modelValue;


            });

            $scope.update = function(city) {



                loadDataFromAirbnb.getData(city).then(function(response) {

                    $scope.$parent.vouchersData = response.data.search_results;


                });


                ngModel.$setViewValue(city.city);

                ngModel.$render();


            };
        }
    };
})

.factory('loadDataFromAirbnb', ['$http', function($http) {
    var listingsData = [];
    var listingsReviews = [];
    const LISTINGS_URL = 'https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&_limit=10&_offset=0&guests=1&location=';
    const LISTING_REVIEWS = 'https://api.airbnb.com/v2/reviews?client_id=3092nxybyb0otqw18e8nh5nty&role=all&listing_id='
    var getData = function(param) {

        return $http.get(LISTINGS_URL + param.city)
            .then(function(response) {

                return listingsData = response;
            });
    }
    var getReviews = function(listingId) {
        return $http.get(LISTING_REVIEWS + listingId)
            .then(function(response) {

                return listingsReviews = response;
            });
    }

    return {
        getData: getData,
        getReviews: getReviews
    };
}]);