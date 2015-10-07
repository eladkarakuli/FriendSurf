Router.configure({
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

Router.onBeforeAction('loading');

Router.route('/', function () {
  this.render('Home');
});

Router.route('/:_id', {
	loadingTemplate: 'loading',
	waitOn: function(){
		return Meteor.subscribe("spots");
	},
	action: function() {
		var spot = Spots.findOne({_id: this.params._id});
		this.render('Spot', { data: {spot: spot}});
	}
});
