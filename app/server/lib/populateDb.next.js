Meteor.populateDb = (function() {
	var fs = Meteor.npmRequire('fs');
	var path = Meteor.npmRequire('path');

	let loadData = function () {
	  var basepath = path.resolve('.').split('.meteor')[0];

	  CSV().from.stream(
	    fs.createReadStream(basepath+'static/spots.csv'),
	      {'escape': '\\'})
	    .on('record', Meteor.bindEnvironment(function(row, index) {
	    	Spots.remove({});
	    	Spots.insert({
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
	      console.log(count, 'records read');
	    });
	}

	return Object.freeze({ loadData });
})();