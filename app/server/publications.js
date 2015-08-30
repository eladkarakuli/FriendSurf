Meteor.publish('forecasts', function() {
    return Forecasts.find();
});