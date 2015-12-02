var configFormlyTypes =  function config(formlyConfigProvider) {  
  formlyConfigProvider.setType({
  	name: 'heightPicker',
    templateUrl: 'client/report-spot/swell-picker-templeate.ng.html'
  });
};

var app = angular.module('waveshout',['angular-meteor',
                                    'ui.router',
                                    'formly',
                                    'formlyBootstrap', 
                                    'angularNumberPicker'], 
                                    configFormlyTypes);

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});