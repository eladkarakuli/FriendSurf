Schemas = {};
Schemas.Report = new SimpleSchema({
  reporter: {
    type: String,
    label: "Reporter Name",
    max: 25,
    optional: true
  },
  height: {
    type: Number,
    label: "Wave Hight (cm)",
    min: 0
  },
  description: {
    type: String,
    label: "Short Description",
    max: 100,
    optional: true
  },
  date: {
    type: Date,
    defaultValue: new Date(),
    denyUpdate: true,
    autoform: {
      type: "hidden",
      label: false
    }
  },
  spotName: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
  }
});


Spots = new Mongo.Collection("spots");
Reports = new Mongo.Collection("reports");
Reports.attachSchema(Schemas.Report);

CurrentForecast = new Mongo.Collection("currentForecast");