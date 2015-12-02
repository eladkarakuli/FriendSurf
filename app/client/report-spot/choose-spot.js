angular.module('waveshout').controller('ChooseSpotCtrl', ['$scope', '$meteor',

  function ($scope, $meteor) {
  	$scope.$meteorSubscribe('spots');
  	$scope.spots = $meteor.collection(function() {
  		return Spots.find();
  	});
	
	
	// Returns collection object, how to iterate? how to relate as array?
	console.log($scope.spots);
	
	// Temp
	$scope.spots = [
	{name: 'Bat-Yam', reports: []},
	{name: 'Palmachim', reports: []},
	{name: 'Zvulun', reports: []},
	{name: 'Haifa-Backdoor', reports: []},
	{name: 'Nechim', reports: []},
	{name: 'Hilton', reports: []}
	];
  }
 ]);