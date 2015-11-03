angular.module('waveshout').controller('SpotsListCtrl', ['$scope', '$meteor', '$location',

  function ($scope, $meteor, $location) {
  	$scope.$meteorSubscribe('currentForecasts');
    $scope.$meteorSubscribe('reports');

    $scope.forecasts = $meteor.collection(function() {
      return CurrentForecast.find();
    });

    /*$scope.spots = Spots.find();
    $scope.count = Spots.find().count();*/

    $scope.report = function() {
    	$location.path('/choosespot');
    }
  }
]);