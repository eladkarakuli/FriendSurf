/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
	'submitReport': function (report) {
		console.log(this);
		console.log('new report:', report);
		Reports.insert(report);
	}
});