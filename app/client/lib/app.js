var configFormlyTypes =  function config(formlyConfigProvider) {  
  formlyConfigProvider.setType({
  	name: 'heightPicker',
    templateUrl: 'swell-picker-templeate.html'
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