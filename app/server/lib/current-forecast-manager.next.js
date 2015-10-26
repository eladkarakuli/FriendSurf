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
    var latestReport = Reports.findOne({spotId: spotId}, {sort: {date: -1}, limit: 1});
    return latestReport;
}

let registerCurrentForecast = function (forecasts) {
    try {
        forecasts.fetch().forEach(function (forecast) {
            CurrentForecast.update({ spotId: forecast.spotId },
                { $set: { forecastSwellHeight: forecast.reports[0].swellHeight } },
                {multi: false, upsert: false}
            );
        });
    } catch (err) {
        console.log("faild to register current forecast: " + err.message);
    }
}

let registerCurrentReport = function (spots) {
    try {
        spots.fetch().forEach(function (spot) {
            var report = getLastReportbySpot(spot._id);
            if (report) {
                CurrentForecast.update({ spotId: spot._id },
                    { $set: { reportSwellHeight: report.height } },
                    {multi: false, upsert: false}
                    );
            }
        });
    } catch (err) {
        console.log("faild to register current reports: " + err.message);
    }
}

let updateForecasts = function(date, time) {
    var forecasts = Forecasts.find(
        { date: date}, 
        { fields: { reports: {$elemMatch: {time: time}}, spotId: 1, date: 1, } }
        );

    if (forecasts.count() === 0) {
        console.log("Error! could not find forecast to set for :" + date + " " + time);
        return;
    }

    registerCurrentForecast(forecasts);
}

let updateLatestReports = function() {
    var spots = Spots.find({});

    if (spots.count() === 0) {
        console.log("Error! could not find spots to set update reports");
        return;
    }

    registerCurrentReport(spots);
}

let updateCurrentSpots = function() {
    var spots = Spots.find({});

    try {
        spots.fetch().forEach(function (spot) {
            CurrentForecast.insert({
                spotId: spot._id,
                spotName: spot.name
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
let updateCurrentForecastAndLatestReport = function(date, time) {
    checkLastUpdate();
    clearCurrentForecast();

    var hour = new Date().getHours();
    date = date || new Date().toJSON().slice(0,10)
    time = time || (Math.floor(hour/3)*300).toString();

    updateCurrentSpots();
    updateForecasts(date, time);
    updateLatestReports();

    setLastUpdate();
}

return Object.freeze({ updateCurrentForecastAndLatestReport, updateLatestReports });
})();