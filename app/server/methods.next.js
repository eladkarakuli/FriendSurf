/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
	'submitReport': function (report) {
		console.log('new report:', report);
		Reports.insert(report);
		Meteor.CurrentForecastManager.updateLatestReports();
	}
});