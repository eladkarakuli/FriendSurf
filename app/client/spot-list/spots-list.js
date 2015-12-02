angular.module('waveshout').controller('SpotsListCtrl', ['$scope', '$meteor', '$location',

  function ($scope, $meteor, $location) {
  	$scope.$meteorSubscribe('currentForecasts');
    $scope.$meteorSubscribe('reports');

    $scope.forecasts = $meteor.collection(CurrentForecast);
	$scope.reports = $meteor.collection(Spots);
	
    /*$scope.spots = Spots.find();
    $scope.count = Spots.find().count();*/

    $scope.report = function() {
    	$location.path('/choosespot');
    }
  }
]);