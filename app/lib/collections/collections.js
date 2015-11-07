var Schemas = {};

Spots = new Mongo.Collection("spots");
Reports = new Mongo.Collection("reports");
CurrentForecast = new Mongo.Collection("currentForecast");

Schemas.Report = new SimpleSchema({
    reporter: {
        type: String,
        label: "Reporter",
        max: 25
    },
    height: {
        type: Number,
        label: "Swell Height",
        max: 10000,
        min: 0
    },
    date: {
        type: Date,
        label: "Report Creation Date"
    },
    description: {
        type: String,
        label: "Description",
        optional: true,
        max: 250
    },
    spotName: {
    	type: String,
    	label: "Reported Spot"
    }
});

Reports.attachSchema(Schemas.Report);
