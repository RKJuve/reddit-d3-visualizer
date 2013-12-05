define([
  'views/root',
  'backbone'
], function (RootView, Backbone) {
  return Backbone.Router.extend({
    routes: {
    	"": "index"
    },
    index: function() {
    	console.log("index route hit")
    }
  });
});
