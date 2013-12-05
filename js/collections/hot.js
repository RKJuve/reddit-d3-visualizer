define(['collection','models/post'], function (Collection, Model) {
  return Collection.extend({
    name: 'hot',
    model: Model,
    url:'http://www.reddit.com/hot.json',
    parse: function(res) {
    	return res.data.children;
    }
  });
});
