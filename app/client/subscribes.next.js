//TODO: when creating spots list 
/*
Meteor.subscribe("reports-by-spot", Session.get("spotId"));
*/


Tracker.autorun(function () {
  Meteor.subscribe("reports");
});