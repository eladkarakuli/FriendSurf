'use strict';

angular.module('waveshout').controller('ListReportsCtrl', ['$scope', '$meteor', '$stateParams', '$location',

	function ($scope, $meteor, $stateParams, $location) {
		$scope.$meteorSubscribe('reports');
		$scope.reports = $meteor.collection(function() {
			return Reports.find({ spotName: $stateParams.spotName });
		});

		setScopeSpot($stateParams.spotName);

		setIsLikedByUser($stateParams.spotName);

		$scope.reportThisSpot = function() {
			$location.path('/' + $stateParams.spotName);
		}

		$scope.like = function() {
			toggleLikeAndRefreshIsLiked('likeSpot');
		}

		$scope.unlike = function() {
			toggleLikeAndRefreshIsLiked('unlikeSpot');
		}

		$scope.yesterday = new Date();
		$scope.yesterday.setDate($scope.yesterday.getDate() - 1);
		$scope.halfday = new Date();
		$scope.halfday.setHours($scope.halfday.getHours() - 12);
		$scope.quarterday = new Date();
		$scope.quarterday.setHours($scope.quarterday.getHours() - 6);

		function setScopeSpot(spotName) {
			$scope.$meteorSubscribe('spots');
			$scope.spot = $meteor.object(Spots, {name: spotName}, false);
		}

		function setIsLikedByUser(spotName) {
			$meteor.call('isSpotLikedByUser', spotName).then(
				function(isLiked) {
					$scope.isLiked = isLiked;
				},
				function(err) {
					console.log("faild getting isLiked", err);
				}
			);
		}

		function toggleLikeAndRefreshIsLiked(methodName) {
			$meteor.call(methodName, $stateParams.spotName);
			setIsLikedByUser($stateParams.spotName);
		}
	}
]);
