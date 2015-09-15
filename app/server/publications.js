Meteor.publish('forecasts', function() {
    return Forecasts.find();
});

Meteor.publish('reports', function() {
	return Reports.find();
});

/*Meteor.publish('reports-by-spot', function(spotId) {
	return Reports.find({spotId: spotId});
});*/