Meteor.wwoInterpreter = (function() {
    let wwoInterpreter = function(data){
        try {
            data = data.data;
            var date = data.weather[0].date;
            var maxtempC = data.weather[0].maxtempC;
            var reports = [];

            _.each(data.weather[0].hourly, function(hourlyData) {
                var report = {
                    time: hourlyData.time,
                    swellHeight: hourlyData.swellHeight_m,
                    tempC: hourlyData.tempC,
                    waterTemp: hourlyData.waterTemp_C,
                    winddirDegree: hourlyData.winddirDegree,
                    windspeedKmph: hourlyData.windspeedKmph
                };

                reports.push(report);
            });

            var forecast = { 
                date: date,
                maxtempC: maxtempC,
                reports: reports
            };

            return forecast;
        } catch (e) {
            // Got a network error, time-out or HTTP error in the 400 or 500 range.
            console.error(e);
            return undefined;
        }
    };

    return {
        interpreteForecast: function(data) {
        return wwoInterpreter(data);
        }
    }
})();