//TODO: when creating spots list 
/*
Meteor.subscribe("reports-by-spot", Session.get("spotId"));
*/

// Subscriptions
Tracker.autorun(function () {
	Meteor.subscribe("reports");
	Meteor.subscribe('forecasts');
	Meteor.subscribe('spots');
});