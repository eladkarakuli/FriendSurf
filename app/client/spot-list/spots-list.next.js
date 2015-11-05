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

	// Spots object to contain ther reports for UI testing purposes
	$scope.spots = [
		{name:'Bat-Yam', reports:[]},
		{name:'Palmachim', reports:[]},
		{name:'Zvulun', reports:[]},
		{name:'Haifa-Backdoor', reports:[]},
		{name:'Nechim', reports:[]},
		{name:'Hilton', reports:[]}
	];
	
	// This report is only for UI testing purposes.
	$scope.reports = [
		{spot:'Bat-Yam', waveHeight: 1.4, user: 'Daniel'},
		{spot:'Bat-Yam', waveHeight: 1.2, user: 'Travajo'},
		{spot:'Bat-Yam', waveHeight: 1.5, user: 'Avner'},
		{spot:'Bat-Yam', waveHeight: 1, user: 'Iko'},
		{spot:'Palmachim', waveHeight: 1.2, user: 'Kelly Slater'},
		{spot:'Palmachim', waveHeight: 1.2, user: 'Sunny'},
		{spot:'Palmachim', waveHeight: 1.2, user: 'CJ.Hobgood'},
		{spot:'Zvulun', waveHeight: 1.0, user: 'CJ1990'},
		{spot:'Haifa-Backdoor', waveHeight: 1.9, user:'YoniK'},
		{spot:'Nechim', waveHeight: 0.9, user: 'Elad'},
		{spot:'Hilton', waveHeight: 1.4, user: 'Avi Avinson'},
		{spot:'Hilton', waveHeight: 1.2, user: 'Kelly Slater'},
		{spot:'Hilton', waveHeight: 1.2, user: 'Ron'},
		{spot:'Hilton', waveHeight: 1, user: 'Surf131'},
		{spot:'Hilton', waveHeight: 0.9, user: 'Elite'},
		{spot:'Hilton', waveHeight: 1, user: 'Pro'},
		{spot:'Hilton', waveHeight: 1.1, user: 'iGetBarelled'},
		{spot:'Hilton', waveHeight: 0.9, user: 'Yoyo1'},
		{spot:'Hilton', waveHeight: 0.8, user: 'Jimm'}
	];
	
	// This logic should be provided by server
	// Splitting the reports by spots and calculating avg
		angular.forEach($scope.spots, function(spot){
			angular.forEach($scope.reports, function(report){
				if(spot.name === report.spot){
					spot.reports.push(report);
				}
			});
		});
		

		angular.forEach($scope.spots,function(spot){
			var avgArray = [];
			var avg = 0;
			
			// Push waveHeight of every report to temp avg array
			angular.forEach(spot.reports,function(report){
				avgArray.push(report.waveHeight);
			});
			
			// Calculate the avg of a single spot 
			angular.forEach(avgArray, function(i){
				avg = avg + i;
			});
			
			avg = avg / avgArray.length;
			spot.avg = Number(avg).toFixed(2);
			console.log(spot.name);
			console.log(spot.avg);
		});
		
	
  }
]);