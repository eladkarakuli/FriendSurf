"use strict";

Meteor.forecastApiUrlGenerator = (function() {

	let hasApiParam = function(obj, key) {
		if (!_.has(obj, key)) {
			console.error("Trying to generate a url without the param " + key);
			return false;
		}

		return true;
	}

	let generate = function(baseUrl, params) {
		if (!hasApiParam(params, 'lat') || !hasApiParam(params, 'lng') || !hasApiParam(params, 'key')) {
			return;
		}

		check(baseUrl, String);
		let tp = _.has(params, 'timePiece') ? params.timePiece : 3; 
		let url = `${baseUrl}?q=${params.lat},${params.lng}&tp=${tp}&format=json&key=${params.key}`;

		return url;
	}

	return Object.freeze({ generate });
})();