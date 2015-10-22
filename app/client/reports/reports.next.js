angular.module('waveshout').controller('ListReportsCtrl', ['$scope', '$meteor', '$stateParams', '$location',

  function ($scope, $meteor, $stateParams, $location) {
	$scope.$meteorSubscribe('reports');
    $scope.reports = $meteor.collection(function() {
    	return Reports.find({ spotId: $stateParams.spotId });
    });

    $scope.reportThisSpot = function() {
    	$location.path('/' + $stateParams.spotId);
    }
  }
]);
