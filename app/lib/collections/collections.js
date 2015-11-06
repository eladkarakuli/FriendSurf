// Define likeable report
var Reports = LikeableModel.extend();
Report.prototype._collection = new Mongo.Collection("reports", {
  transform: function(doc) {
    return new Report(doc);
  }
});

// Define likeable spot
var Spot = LikeableModel.extend();
Spot.prototype._collection = new Mongo.Collection("spots", {
  transform: function(doc) {
    return new Spot(doc);
  }
});

Spots = Spot.prototype._collection;
Reports = Report.prototype._collection;
CurrentForecast = new Mongo.Collection("currentForecast");