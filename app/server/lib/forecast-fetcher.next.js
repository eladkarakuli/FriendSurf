"use strict";

let fetcher = function(caller, url){
    check(url, String);
    let that = caller;
    that.unblock();
    
    try {
        let result = Meteor.http.get(url, {timeout:10000});

        if (result !== undefined && result.statusCode === 200) {
            var respJson = JSON.parse(result.content);
            return respJson;
        } else if (result !== undefined) {
            var errorJson = JSON.parse(result.content);
            throw(result.statusCode + " " + errorJson.error);
        } else {
            throw("No response while fetching forecast!") 
        }
    } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        console.error(e);
        return undefined;
    }
};

let interpreteData = function(data) {
    let forecast = Meteor.call('interpreteForecast', data);
    if (forecast === undefined) {
        throw("faild to interprete data: " + data);
    }

    return forecast;
};

Meteor.methods({ 
    fetchForecast: function(url) { return fetcher(this, url); }
});

Meteor.methods({ saveForecast: (respJson, spotName) => {
    console.log(respJson + ' - ' + spotName)
    try {
        if (respJson === undefined || !_.has(respJson, 'data')) {
            debugger;
            throw("Faild to save a bad response: " + respJson);
        }

        let forecast = interpreteData(respJson);
        forecast.spotName = spotName;
        Forecasts.upsert({spotName: forecast.spotName, date: forecast.date}, forecast);
    }
    catch (e) {
        console.error(e);
    }
}});