Forecasts = new Mongo.Collection("forecasts");
Forecasts._ensureIndex({date: 1, spotId: 1}, {unique: 1});
//
Spots = new Mongo.Collection("spots");