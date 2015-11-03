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

	$scope.reports = [
		{spot:'Bat-Yam', waveHeight: 1.4, user: 'Daniel'},
		{spot:'Palmachim', waveHeight: 1.2, user: 'Kelly Slater'},
		{spot:'Zvulun', waveHeight: 1.0, user: 'CJ1990'},
		{spot:'Haifa-Backdoor', waveHeight: 1.9, user:'YoniK'},
		{spot:'Nechim', waveHeight: 0.9, user: 'Elad'},
		{spot:'Hilton', waveHeight: 1.4, user: 'Avi Avinson'}
	];
		
  }
]);