'use strict';

angular.module('guestyCities.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2/:id/:name/:address/:city', {
        templateUrl: 'view2/view2.html',
        controller: 'detailsCtrl'
    });
}])



.controller('detailsCtrl', function($scope, loadDataFromAirbnb, $timeout, $http, $location, $routeParams) {
    $scope.routeParams = $routeParams;
    
    var currentId = parseInt($scope.routeParams.id);

    $scope.reviewsData = [];

    loadDataFromAirbnb.getReviews(currentId).then(function(response) {

        $scope.reviewsData = response.data.reviews;


    });

    $scope.backToHome = function() {
         $location.url('/view1');
        
       
    }



});