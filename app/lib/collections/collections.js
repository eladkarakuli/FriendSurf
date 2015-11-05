Reports = new Mongo.Collection("reports");
CurrentForecast = new Mongo.Collection("currentForecast");

// Define likeable spot
var Spot = LikeableModel.extend();
Spot.prototype._collection = new Mongo.Collection("spots", {
  transform: function(doc) {
    return new Spot(doc);
  }
});

Spots = Spot.prototype._collection;