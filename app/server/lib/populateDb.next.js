'use strict';

Meteor.populateDb = (function() {
	var fs = Meteor.npmRequire('fs');

	let loadData = function () {
	  
	  // Get base path based on OS
	  var isWin = /^win/.test(process.platform);
	  var appBasePath = isWin ? process.cwd() : process.env.PWD;
	  var rootFolderPath = isWin ? '..\\..\\..\\..\\..\\..\\' : '../';
	  var spotsCsvPath = path.join(appBasePath, rootFolderPath, '/static/spots.csv'); 
	  
	  
	  // For windows, or to be more accurate - for KAZAK !!!!
	  /*var spotsCsvPath =  'C:/Users/DELL/Documents/GitHub/friend-surf/static/spots.csv';*/

	  CSV().from.stream(
	    fs.createReadStream(spotsCsvPath),
	      {'escape': '\\'})
	    .on('record', Meteor.bindEnvironment(function(row, index) {
	    	Spots.upsert({ name: row[2] }, { $set: {
	    		'lat': row[0],
	    		'lng': row[1],
	    		'name': row[2]
	    	}});
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