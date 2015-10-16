angular.module('waveshout').controller('InsertReportCtrl', ['$scope', '$meteor', '$stateParams',

  function ($scope, $meteor, $stateParams) {
    $scope.$meteorSubscribe('reports');
    $scope.reports = $meteor.collection(Reports);

  	var vm = this;
  	vm.user = {};

  	vm.fields = [
  	{
  		key: 'reporter',
  		type: 'input',
  		templateOptions: {
  			label: "Reporter Name"
  		},
  		data: {
  			customMaxLength: 25
  		}
  	},
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
      $scope.reports.push({
        reporter: report.reporter,
        height: report.height,
        description: report.description,
        date: new Date(),
        spotId: $stateParams.spotId
      });
      
      vm.options.resetModel();
    }
  }
]);