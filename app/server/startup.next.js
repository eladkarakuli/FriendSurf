let fetchForecastHandler = function(url, spotId) {
	Meteor.call('fetchForecast', url,
		(error, result) => { 
			error === undefined ? Meteor.call('saveForecast', result, spotId) : console.log("err " + error + " res " + result); 
		}
	);
};

let initializeFetchingIntervals = function(apiBaseUrl, apiKey, interval = 10000) { 
	check(apiBaseUrl, String);
	check(apiKey, String);

	let spots = Spots.find({}).fetch();
	spots.forEach(function (spot) {
		let params = {
			lat: spot.lat,
			lng: spot.lng,
			key: apiKey
		},
		baseUrl = apiBaseUrl;

		let url = Meteor.forecastApiUrlGenerator.generate(baseUrl, params);
		console.log('url: ' + url);
		console.log('id:' + spot._id);
		Meteor.setInterval(() => { fetchForecastHandler(url, spot._id) } , interval);
	});
};

Meteor.initializeFetchingIntervalsBasedSettings = function() {
	let forecastFetchInterval = 10000; // TODO: put this in settings/config

	initializeFetchingIntervals(Meteor.settings.forecastApiUrl, Meteor.settings.forecastApiKey, forecastFetchInterval);
};

Meteor.startup(() => {
    console.log("Initializing forecast fetcher interval based settings.");
    //Meteor.initializeFetchingIntervalsBasedSettings();

    /*console.log("populating Data Base with the static data.")
    Meteor.populateDb.loadData();*/

	console.log("Finish server startup!");
});