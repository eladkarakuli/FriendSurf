Template.spot.helpers({
	// set default value of spot id for report doc insertion
    defaultValues: function() {
        return { spotId: this.spot._id };
    }
});