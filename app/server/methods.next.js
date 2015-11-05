/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
function isSpotLikedByUser(spotName) {
	var spot = Spots.findOne({name: spotName});
	var user = Meteor.user();
	return spot && user && spot.isLikedBy(user);
}

Meteor.methods({
	'submitReport': function (report) {
		console.log('new report:', report);
		Reports.insert(report);
		Meteor.CurrentForecastManager.updateLatestReports();
	},
	'likeSpot': function(spotName) {
		var spot = Spots.findOne({name: spotName});
		var user = Meteor.user();

		if(spot && user && !spot.isLikedBy(user)) {
			spot.like();
			Spots.update({name: spotName}, {$inc: { likes: 1 }});
		}
	},
	'unlikeSpot': function(spotName) {
		var spot = Spots.findOne({name: spotName});
		var user = Meteor.user();
	
		if(spot && user && spot.isLikedBy(user)) {
			spot.unlike();
			Spots.update({name: spotName}, {$inc: { likes: -1 }});
		}	
	},
	'isSpotLikedByUser': function(spotName) {
		var isLiked = isSpotLikedByUser(spotName);
		return isLiked;
	}
});