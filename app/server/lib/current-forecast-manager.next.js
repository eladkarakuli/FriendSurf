"use strict";

Meteor.CurrentForecastManager = (function() {

let setLastUpdate = function(){
//set the global update time
}

let checkLastUpdate = function() {
 // throw error if last update less then an hour
}

let clearCurrentForecast = function() { 
    CurrentForecast.remove({});
}

let getLastReportbySpot = function(spotId) {
    return Reports.find({spotId: spotId}).sort({date: -1}).limit(1);
}

let registerCurrentForecast = function (forecasts) {
    try {
        forecasts.fetch().forEach(function (forecast) {
            let name = Spots.findOne({ _id: forecast.spotId }).name;
            let latestReport = getLastReportbySpot(forecast.spotId);
            CurrentForecast.insert({
                spotId: forecast.spotId,
                spotName: name,
                forecastSwellHeight: forecast.reports[0].swellHeight,
                reportSwellHeight: latestReport
            });
        });
    } catch (err) {
        console.log("faild to register current forecast: " + err.message);
    }
}

/*
date - "YYYY-MM-DD"
time - 0 as midnight, 0300 as 3am, 1200 as 12pm, 2100 as 9pm ect.
*/
let setCurrentForecast = function(date, time) {
    checkLastUpdate();

    var hour = new Date().getHours();
    date = date || new Date().toJSON().slice(0,10)
    time = time || (Math.floor(hour/3)*300).toString();

    var forecasts = Forecasts.find(
        { date: date}, 
        { fields: { reports: {$elemMatch: {time: time}}, spotId: 1, date: 1, } }
        );

    if (forecasts.count() === 0) {
        console.log("Error! could not set current forecast:" + date + " " + time);
        return;
    }

    clearCurrentForecast();
    registerCurrentForecast(forecasts);
    setLastUpdate();
}

return Object.freeze({ setCurrentForecast });
})();