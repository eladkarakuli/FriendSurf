/*Template.spot.helpers({
	// set default value of spot id for report doc insertion
    defaultValues: function() {
        return { spotId: this.spot._id };
    }
});*/

angular.module('waveshout').controller('InsertReportCtrl', ['$scope', '$meteor', '$stateParams',

  function ($scope, $meteor, $stateParams) {
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
  		key: 'hight',
  		type: 'input',
  		templateOptions: {
  			label: "Wave Hight (cm)"
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
         

  	/*$stateParams.booksId*/
/*  	$scope.$meteorSubscribe('currentForecasts');
    $scope.forecasts = $meteor.collection(function() {
    	return CurrentForecast.find();
    });*/

    /*$scope.spots = Spots.find();
    $scope.count = Spots.find().count();*/
  }
]);