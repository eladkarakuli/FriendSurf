angular.module('waveshout').controller('userInterfaceCtrl', ['$scope', '$meteor', '$stateParams',  '$location', '$timeout',

  function ($scope, $meteor, $stateParams, $location, $timeout) {
  	$scope.loginUser = '';
    $scope.loginPasswd = '';
    $scope.newUser = {};
    $scope.messages = {};


  	// Login function
    $scope.doLogin = function(){
    	Meteor.loginWithPassword($scope.loginUser, $scope.loginPasswd, function(err){
          if(err){
            $scope.messages.error = err.reason;
          }

          else {
          	console.log('loggedin');
          	
          }
        });
    };

    $scope.doLogout = function(){
    	Meteor.logout(function(err){
          if(err){
            $scope.messages.error = err.reason;
          }

          else {
          	console.log('loggedout');
          }
        });
    }

    $scope.doRegister = function(){
    	Accounts.createUser({username: $scope.loginUser, password: $scope.loginPasswd}, function(err){
    		if(err){
    			$scope.messages.error = "Account creation failed.";
    		} else {
    			$scope.messages.success = "User registration succeed!";
    			$timeout(() => $scope.doLogin(), 1500);
    		}
    	})
    }


}]);