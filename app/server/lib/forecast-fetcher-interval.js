"use strict";

Meteor.fetchingPoolManager = (function() {

let fetchList = [];

let isSpotUpdated = function(spotName) {
	var hourAgo = Date.create('1 hour ago');
	var recentForecast = Forecasts.findOne({spotName: spotName, 
		date: new Date().format("{yyyy}-{MM}-{dd}"),
		requestDate: {$gt: hourAgo}
	});

	return recentForecast !== undefined;
}

let fetchForecastHandler = function(url, spotName) {
	//stop handling fetch when spot is alredy up-to-date
	if (isSpotUpdated(spotName)) {
		return;
	}

	try {
		console.log("Fetching forecast for ", spotName);
		Meteor.forecastFetcher.fetch(url).then(
			function(result) {
				Meteor.forecastFetcher.saveFetch(result, spotName);
			},
			function(error) {
				console.log("Faild to fetch ", url, spotName, error.message);
			}
		);
	}
	catch(error) {
		console.log("Error while fetching forecast", error.message);
	}
}

let validateTodayFetch = function() {
	return Forecasts.find({date: new Date().toJSON().slice(0,10)}).count() === 0;
}

let addFetchInterval = function(spotName, url) {
		console.log('Setting fetch interval for ', spotName, url);
		fetchList.push(() => { fetchForecastHandler(url, spotName); });
}

let generateUrl = function(spot, apiBaseUrl, apiKey) {
	let params = {
		lat: spot.lat,
		lng: spot.lng,
		key: apiKey
	},
	baseUrl = apiBaseUrl;
	return Meteor.forecastApiUrlGenerator.generate(baseUrl, params);
}

let runFetch = function() {
	fetchList.forEach((handler) => handler());
}

let initializeFetchingIntervals = function(apiBaseUrl, apiKey, interval = 3600000) { 
	check(apiBaseUrl, String);
	check(apiKey, String);

	let spots = Spots.find({}).fetch();
	spots.forEach(function (spot) {
		try{
			let url = generateUrl(spot, apiBaseUrl, apiKey);
			addFetchInterval(spot.name, url);
		}
		catch(error) {
			console.log("Could not initialize fetch interval for ", url, error.message);
		}
	});
	
	Meteor.setInterval(() => { runFetch() } , interval);
}


let initializeFetchingIntervalsBasedSettings = function() {
	let forecastFetchInterval = 3600000; // TODO: put this in settings/config

	initializeFetchingIntervals(Meteor.settings.forecastApiUrl, Meteor.settings.forecastApiKey, forecastFetchInterval);
}

return Object.freeze({ runFetch, initializeFetchingIntervalsBasedSettings });
})();