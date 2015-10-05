"use strict";

Meteor.forecastFetcher = (function() {

let fetchList = [];

let fetchForecastHandler = function(url, spotId) {
	Meteor.call('fetchForecast', url,
		(error, result) => { 
			error === undefined ? Meteor.call('saveForecast', result, spotId) : console.log("err " + error + " res " + result); 
		}
	);
}

let validateTodayFetch = function() {
	return Forecasts.find({date: new Date().toJSON().slice(0,10)}).count() === 0;
}

let runFetch = function() {
	fetchList.forEach((handler) => handler());
}

let initializeFetchingIntervals = function(apiBaseUrl, apiKey, interval = 3600000) { 
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
		fetchList.push(() => { fetchForecastHandler(url, spot._id); });
	});
	
	Meteor.setInterval(() => { runFetch() } , interval);
}


let initializeFetchingIntervalsBasedSettings = function() {
	let forecastFetchInterval = 3600000; // TODO: put this in settings/config

	initializeFetchingIntervals(Meteor.settings.forecastApiUrl, Meteor.settings.forecastApiKey, forecastFetchInterval);
}

return Object.freeze({ runFetch, initializeFetchingIntervalsBasedSettings });
})();