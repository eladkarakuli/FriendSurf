"use strict";

var ForecastFetcher = {
    fetchForecast (url) {
        return new Promise((resolve, reject) => {
            this.unblock();
            let result = Meteor.http.get(url, {timeout:10000});

            if(result && result.statusCode === 200) {
                //console.log("response received.");
                var respJson = JSON.parse(result.content);
                resolve(respJson);
            } else if (result !== undefined) {
                //console.log("Response issue: ", result.statusCode);
                var errorJson = JSON.parse(result.content);
                reject(result.statusCode + " " + errorJson.error);
            } else {
                //console.log("No response");
                reject("No response");
            }
        });
    },
    saveForecast (url) {
        getForecast(url).then(function(result) { 
            Forecasts.insert(result.data);
        }, function(err) {
          console.log(err);
      });
    }
};