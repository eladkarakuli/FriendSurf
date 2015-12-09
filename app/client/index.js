angular.module('waveshout').controller('IndexCtrl', ['$scope','$rootScope', '$meteor', '$stateParams',  '$location', '$timeout',

  function ($scope, $rootScope, $meteor, $stateParams, $location, $timeout) {
  	$scope.currentUser = $rootScope.currentUser;
  }]);