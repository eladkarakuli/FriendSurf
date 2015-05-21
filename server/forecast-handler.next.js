"use strict";

Meteor.methods({
    getForecast: function() {
        this.unblock();
        let url = "https://api.twitch.tv/kraken/streams?limit=3";
        return Meteor.http.get(url);
    },
    saveForecast: function() {
        Meteor.call('getForecast', function(err, res) {
            let data = res.data;

            Forecasts.insert(data);
        });
    }
});

Meteor.startup(function(){
    Meteor.setInterval(() => { Meteor.call('saveForecast'); }, 1000);
});