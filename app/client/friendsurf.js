if (Meteor.isClient) {

  ReactiveTabs.createInterface({
    template: 'basicTabs',
    onChange: function (slug, template) {
      // This callback runs every time a tab changes.
      // The `template` instance is unique per {{#basicTabs}} block.
      /*console.log('[tabs] Tab has changed! Current tab:', slug);
      console.log('[tabs] Template instance calling onChange:', template);*/
    }
  });

  Template.spotsList.helpers({
    spots: function() {
      return Spots.find();
    },
    count: function() {
      return Spots.find().count();
    },
    forecasts: function () {
      return CurrentForecast.find();
    }
  });

  Template.myTemplate.helpers({
    tabs: function () {
      // Every tab object MUST have a name and a slug!
      return [
        { name: 'Spots', slug: 'spots' },
        { name: 'Report', slug: 'report' },
        { name: 'Things', slug: 'things', onRender: function(template) {
          // This callback runs every time this specific tab's content renders.
          // As with `onChange`, the `template` instance is unique per block helper.
          alert("[tabs] Things has been rendered!");
        }}
      ];
    },
    activeTab: function () {
      // Use this optional helper to reactively set the active tab.
      // All you have to do is return the slug of the tab.

      // You can set this using an Iron Router param if you want--
      // or a Session variable, or any reactive value from anywhere.

      // If you don't provide an active tab, the first one is selected by default.
      // See the `advanced use` section below to learn about dynamic tabs.
      return Session.get('activeTab'); // Returns "people", "places", or "things".
    }
  });

  Template.chartTemplate.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: this.username + "'s top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'column',
            name: 'genre',
            data: [
                ['Adventure',   45.0],
                ['Action',       26.8],
                ['Ecchi',   12.8],
                ['Comedy',    8.5],
                ['Yuri',     6.2]
            ]
        }]
    };
  };
}