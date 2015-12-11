'use strict';

angular.module('waveshout').controller('ListReportsCtrl', ['$scope', '$meteor', '$stateParams', '$location',

	function ($scope, $meteor, $stateParams, $location) {
		$scope.$meteorSubscribe('reports');
		$scope.$meteorSubscribe('favorites');
		$scope.$meteorSubscribe('likes');

		$scope.reports = $meteor.collection(function() {
			return Reports.find({ spotName: $stateParams.spotName });
		});

		setScopeSpot($stateParams.spotName);

		$scope.reportThisSpot = function() {
			$location.path('/' + $stateParams.spotName);
		}

		$scope.yesterday = new Date();
		$scope.yesterday.setDate($scope.yesterday.getDate() - 1);
		$scope.halfday = new Date();
		$scope.halfday.setHours($scope.halfday.getHours() - 12);
		$scope.quarterday = new Date();
		$scope.quarterday.setHours($scope.quarterday.getHours() - 6);

		function setScopeSpot(spotName) {
			$scope.$meteorSubscribe('spots');
			$scope.spot = $scope.$meteorObject(Spots, {name: spotName}, false);
		}
	}
]);