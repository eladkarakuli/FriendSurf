Schemas = {};
Schemas.Report = new SimpleSchema({
  reporter: {
    type: String,
    label: "Reporter Name",
    max: 25,
    optional: true
  },
  hight: {
    type: Number,
    label: "Wave Hight (cm)",
    min: 0
  },
  description: {
    type: String,
    label: "Short Description",
    max: 100,
    optional: true
  }
});


Spots = new Mongo.Collection("spots");
Reports = new Mongo.Collection("reports");
Reports.attachSchema(Schemas.Report);