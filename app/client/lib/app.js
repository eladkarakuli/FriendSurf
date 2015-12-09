var app = angular.module('waveshout', ['angular-meteor',
                                      'ui.router',
                                      'formly',
                                      'formlyBootstrap']);

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});