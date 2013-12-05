define([
  'views/root',
  'backbone',
  'underscore',
  'collections/hot'
], function (RootView, Backbone, _, FrontPageHotPosts) {
  return Backbone.Router.extend({
    routes: {
    	"": "index"
    },
    index: function() {
    	var frontPageHotPosts = new FrontPageHotPosts();
    	frontPageHotPosts.fetch({
    		success: function(res) {
    			console.log(res);
    		}
    	});
    }
  });
});
