angular.module('waveshout').controller('ListReportsCtrl', ['$scope', '$meteor', '$stateParams', '$location',

  function ($scope, $meteor, $stateParams, $location) {
	$scope.$meteorSubscribe('reports');
    $scope.reports = $meteor.collection(function() {
    	return Reports.find({ spotId: $stateParams.spotId });
    });

    $scope.reportThisSpot = function() {
    	$location.path('/' + $stateParams.spotId);
    }

    $scope.yesterday = new Date();
    $scope.yesterday.setDate($scope.yesterday.getDate() - 1);
    $scope.halfday = new Date();
    $scope.halfday.setHours($scope.halfday.getHours() - 12);
    $scope.quarterday = new Date();
    $scope.quarterday.setHours($scope.quarterday.getHours() - 6);
  }
]);
