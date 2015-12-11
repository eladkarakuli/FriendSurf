'use strict';

angular.module('waveshout').directive('likeable', [function () {
  return  {
    restrict: 'AE',
    scope: {
      obj: '=',
    },
    controller: ['$scope', function ($scope) {
    	let like = () => {
    		return $scope.obj.like && $scope.obj.like();
    	}
    	let unlike = () => {
    		return $scope.obj.unlike && $scope.obj.unlike();
    	}
    		
    	$scope.$watch(()=> { 
    			return $scope.obj.likeCount && $scope.obj.likeCount();
    		},
    		function (newObj) {
	    		$scope.likeCount = newObj;
	    	}
	    );

	    $scope.$watch(()=> { 
    			return $scope.obj.isLikedBy && Meteor.user() && $scope.obj.isLikedBy(Meteor.user());
    		},
    		function (newObj) {
	    		$scope.isLiked = newObj;
	    	}
	    );
	    		
  		$scope.isDisabled = Meteor.userId() == undefined;
    	$scope.toggleLike = () => {
    		if ($scope.isDisabled) {
    			return;
    		}
    		else if (!$scope.isLiked) {
    			like();
    		}
    		else {
    			unlike();
    		}
    	}
    }],
    templateUrl: 'client/likeable/favoriteCounts.ng.html'
  };
}]);