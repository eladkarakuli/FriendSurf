'use strict';

Meteor.populateDb = (function() {
	var fs = Meteor.npmRequire('fs');

	let loadData = function () {
	  var appBasePath = process.env.PWD;
	  var spotsCsvPath = path.join(appBasePath, '../', '/static/spots.csv');

	  CSV().from.stream(
	    fs.createReadStream(spotsCsvPath),
	      {'escape': '\\'})
	    .on('record', Meteor.bindEnvironment(function(row, index) {
	    	Spots.upsert({ name: row[2] }, {
	    		'lat': row[0],
	    		'lng': row[1],
	    		'name': row[2]
	    	})
	      }, function(error) {
	          console.log('Error in bindEnvironment:', error);
	      }
	    ))
	    .on('error', function(err) {
	      console.log('Error reading CSV:', err);
	    })
	    .on('end', function(count) {
	      console.log(count, 'spots read and update DB');
	    });
	}

	return Object.freeze({ loadData });
})();