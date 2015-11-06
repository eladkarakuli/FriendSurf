angular.module('waveshout').controller('SpotsListCtrl', ['$scope', '$meteor', '$location',

  function ($scope, $meteor, $location) {
  	$scope.$meteorSubscribe('currentForecasts');
    $scope.$meteorSubscribe('reports');

    $scope.forecasts = $meteor.collection(function() {
      return CurrentForecast.find();
    });
	
	$scope.reports = $meteor.collection(function() {
			return Reports.find(); 
		});
	
	console.log($scope.reports);
	console.log($scope.reports.length);
    /*$scope.spots = Spots.find();
    $scope.count = Spots.find().count();*/

    $scope.report = function() {
    	$location.path('/choosespot');
    }
	
	
	// TEMP DATA AND LOGIC FOR UI STRUCTURE 
	$scope.spots = [
	{name: 'Bat-Yam', reports: []},
	{name: 'Palmachim', reports: []},
	{name: 'Zvulun', reports: []},
	{name: 'Haifa-Backdoor', reports: []},
	{name: 'Nechim', reports: []},
	{name: 'Hilton', reports: []}
	];

	
	// TEMP We need to talk about reports, how to structure, etc.
	$scope.reportsTEMP = [
		{spot:'Bat-Yam', height: 1.2, reporter: 'Daniel'},
		{spot:'Bat-Yam', height: 1.2, reporter: 'Travajo'},
		{spot:'Bat-Yam', height: 1.3, reporter: 'EliKlatis'},
		{spot:'Bat-Yam', height: 1.4, reporter: 'OSchwartz'},
		{spot:'Palmachim', height: 1.2, reporter: 'Kelly Slater'},
		{spot:'Palmachim', height: 1.0, reporter: 'ShaB'},
		{spot:'Palmachim', height: 1.2, reporter: 'Alon'},
		{spot:'Zvulun', height: 1.2, reporter: 'CJ1990'},
		{spot:'Zvulun', height: 1.0, reporter: 'AdiBear'},
		{spot:'Zvulun', height: 1.0, reporter: 'Kazako'},
		{spot:'Zvulun', height: 1.3, reporter: 'Itay93'},
		{spot:'Zvulun', height: 1.1, reporter: 'Soulsurf'},
		{spot:'Zvulun', height: 1.5, reporter: 'ABB13'},
		{spot:'Haifa-Backdoor', height: 1.9, reporter:'YoniK'},
		{spot:'Nechim', height: 0.9, reporter: 'Elad'},
		{spot:'Nechim', height: 1.5, reporter: 'Born2burn'},
		{spot:'Nechim', height: 0.8, reporter: 'Ardelany'},
		{spot:'Hilton', height: 1.4, reporter: 'Avi Avinson'},
		{spot:'Hilton', height: 1.1, reporter: 'Master'},
		{spot:'Hilton', height: 1.1, reporter: 'IgetBarreled'},
		{spot:'Hilton', height: 1.0, reporter: 'Sima'}
	];
		
	
	// This logic to be implemented on the server side.
	angular.forEach($scope.spots, function(spot){
		angular.forEach($scope.reports, function(report){
			if(report.spotName === spot.name){
				spot.reports.push(report);
			}
		});
	});
	
	angular.forEach($scope.spots, function(spot){
		var avgTemp = [];
		var avg = 0;
		
		angular.forEach(spot.reports,function(report){
			avgTemp.push(report.height);
			avg = avg + report.height;
		});
		
		spot.avg = Number(avg / avgTemp.length).toFixed(2);
		console.log(spot.name);
		console.log(spot.avg);
		
	});
		
		
  }
]);