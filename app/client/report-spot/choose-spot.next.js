angular.module('waveshout').controller('ChooseSpotCtrl', ['$scope', '$meteor',

  function ($scope, $meteor) {
  	$scope.$meteorSubscribe('spots');
  	/* $scope.spots = $meteor.collection(function() {
  		return Spots.find();
  	}); */
		$scope.spots = [
			{name: 'Bat-Yam'},
			{name: 'Zvulun'},
			{name: 'Rishon-Le-Zion'},
			{name: 'Haifa-Backdoor'},
			{name: 'Hilton'}
		];
  }
 ]);