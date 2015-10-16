if (Meteor.isClient) {
  console.log("index");
  var app = angular.module('waveshout',['angular-meteor',
                                        'ui.router',
                                        'formly',
                                        'formlyBootstrap']);
}