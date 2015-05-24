Meteor.startup(() => {
	let FORECAST_API_GET_INTEVAL = 10000;
	let FORECAST_API_URL = "http://api.worldweatheronline.com/free/v2/marine.ashx?key=49d21cbf01b52a5ef55673aa143be&q=32.016351,34.737444&format=json&tp=24";

    Meteor.setInterval(() => { ForecastFetcher.saveForecast(FORECAST_API_URL); }, FORECAST_API_GET_INTEVAL);
});