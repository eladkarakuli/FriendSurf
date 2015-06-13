let fetchForecastHandler = function(url) {
	Meteor.call('fetchForecast', url,
		(error, result) => { 
			error === undefined ? Meteor.call('saveForecast', result) : console.log("err " + error + " res " + result); 
		}
	);
}

Meteor.initializeFetchingIntervalsBasedSettings = function() {
	let forecastFetchInterval = 10000; // TODO: put this in settings/config

	initializeFetchingIntervals(Meteor.settings.forecastApiUrl, Meteor.settings.forecastApiKey, forecastFetchInterval);
}

let initializeFetchingIntervals = function(apiBaseUrl, apiKey, interval = 10000) { 
	check(apiBaseUrl, String);
	check(apiKey, String);

	spots = Spots.find({});
	spots.forEach(function (spot) {
		let params = {
			lat: spot.lat,
			lng: spot.lng,
			key: apiKey
		},
		baseUrl = apiBaseUrl;

		let url = Meteor.forecastApiUrlGenerator.generate(baseUrl, params);
		Meteor.setInterval(() => { fetchForecastHandler(url) } , interval);
	});
}

Meteor.startup(() => {
    //console.log("Initializing forecast fetcher interval based settings.");
    //Meteor.initializeFetchingIntervalsBasedSettings();

    /*console.log("populating Data Base with the static data.")
    Meteor.populateDb.loadData();*/

    let baseUrl = "http://api.worldweatheronline.com/free/v2/marine.ashx";
    let params = {
    	lat: 1,
    	lng: 2,
    	key: "123secret",
    	tp: 6
    }

    let url = Meteor.forecastApiUrlGenerator.generate(baseUrl, params);
    console.log(url);

	console.log("Finish server startup!");
});