define(['model'], function (Model) {
  return Model.extend({
    name: 'post',
    parse: function(res) {
    	return res.data;
    }
  });
});
