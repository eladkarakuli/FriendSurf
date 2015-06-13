"use strict";

let fetcher = function(caller, url){
    let that = caller;
    check(url, String);
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

Meteor.methods({ fetchForecast: function(url) { return fetcher(this, url); }});

Meteor.methods({ saveForecast: (respJson) => {
        if (respJson !== undefined && _.has(respJson, 'responseData'))
            Forecasts.insert(respJson.responseData);
}});