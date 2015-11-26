angular.module('waveshout').controller('InsertReportCtrl', ['$scope', '$meteor', '$stateParams',  '$location', '$timeout',

  function ($scope, $meteor, $stateParams, $location, $timeout) {
    $scope.$meteorSubscribe('reports');
    $scope.reports = $meteor.collection(Reports);
    $scope.spotName = $stateParams.spotName;
    $scope.messages = {};
    

  	var vm = this;
  	vm.user = {};

    

  	vm.fields = [
  	/*{
  		key: 'reporter',
  		type: 'input',
  		templateOptions: {
  			label: "Reporter Name"
  		},
  		data: {
  			customMaxLength: 25
  		}
  	},*/
  	{
  		key: 'height',
  		type: 'input',
  		templateOptions: {
  			label: "Wave Height (cm)"
  		}
  	},
  	{
  		key: 'description',
  		type: 'input',
  		templateOptions: {
  			label: "Short Description"
  		},
  		data: {
  			customMaxLength: 100
  		}
  	}];
         
    vm.submit = function(report) {
      if(Meteor.userId() != null){
          var newReport = {
            reporter: Meteor.user().username,
            height: report.height,
            description: report.description,
            date: new Date(),
            spotName: $stateParams.spotName,
            owner: Meteor.userId(),
          };

     
          $meteor.call('submitReport', newReport).then(
            function(valid) {
              $scope.messages.success = "Thank you!";
              $timeout(() => $location.path('/reports/' + $stateParams.spotName), 1000);
            },
            function(err) {
              $scope.messages.error = err.details;
            }
          );
      } else {
        $scope.messages.error = "You must be logged in, in order to report."
      }
      
    }
  }
]);