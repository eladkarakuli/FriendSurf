console.log("router");
angular.module('waveshout').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
	function($urlRouterProvider, $stateProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$stateProvider
		.state('spotsList', {
			url: '/',
			templateUrl: 'client/spot-list/spots-list.ng.html',
			controller: 'SpotsListCtrl'
		})
		.state('insertReport', {
			url: '/:spotId',
			templateUrl: 'client/report-spot/spot.ng.html',
			controller: 'InsertReportCtrl as vm'
		});
		$urlRouterProvider.otherwise("/");
}]);