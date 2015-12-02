"use strict";

Meteor.forecastFetcher = (function() {

    let fetcher = function(caller, url){
        check(url, String);

        return new Promise(
            function(resolve, reject) {
            try {
                let result = Meteor.http.get(url, {timeout:10000});

                if (result !== undefined && result.statusCode === 200) {
                    var respJson = JSON.parse(result.content);
                    resolve(respJson);
                } else if (result !== undefined) {
                    var errorJson = JSON.parse(result.content);
                    throw(result.statusCode + " " + errorJson.error);
                } else {
                    throw("No response while fetching forecast!") 
                }
            } catch (err) {
                // Got a network error, time-out or HTTP error in the 400 or 500 range.
                reject(err);
            }
        });
    };

    let interpreteData = function(data) {
        let forecast = Meteor.wwoInterpreter.interpreteForecast(data);
        
        if (forecast === undefined) {
            throw("faild to interprete data: " + data);
        }

        return forecast;
    };

    let appendDate  = function(respJson) {
        return _.extend({requestDate: new Date()} ,respJson);
    }

    return {
        fetch: function(url) {
         return fetcher(this, url);
        },
        saveFetch: (respJson, spotName) => {
            try {
                if (respJson === undefined || !_.has(respJson, 'data')) {
                    console.log();
                    throw('[' + respJson.responseStatus + ']Faild to save response for spot: ' +spotName);
                }

                let forecast = interpreteData(respJson);
                forecast = appendDate(forecast)
                forecast.spotName = spotName;
                Forecasts.upsert({spotName: forecast.spotName, date: forecast.date}, forecast);
            }
            catch (e) {
                console.error(e);
            }
        },
        
    }
})();