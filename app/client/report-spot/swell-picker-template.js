angular.module('waveshout').controller('DemoController', ['$scope', function($scope) {
   $scope.input = {
            num: 0
        };

   $scope.getNumber = function() {
       alert('The number is: [' + $scope.input.num + ']');
   };

   $scope.onChange = function(){
       console.log('The number is Changed ', $scope.input.num);
   };
}]);