angular.module('waveshout').controller('SpotsListCtrl', ['$scope', '$meteor',

  function ($scope, $meteor) {
  	$scope.$meteorSubscribe('currentForecasts');
    $scope.forecasts = $meteor.collection(function() {
    	return CurrentForecast.find();
    });

    /*$scope.spots = Spots.find();
    $scope.count = Spots.find().count();*/
  }
]);