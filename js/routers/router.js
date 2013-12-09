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
          _.each(res.models, function(elem, i) {
            // console.log(elem);
            D3dataset.nodes.push({
              node: elem.attributes.title,
              radius: (elem.attributes.score/10),
              link: elem.attributes.url
            });
          });
          drawGraph(D3dataset);
    		}
    	});
    }
  });
});
