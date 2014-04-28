define(['backbone', 'contact-us/model'], function (Backbone, Model){
	var Collection = Backbone.Collection.extend({
		model: Model,
		url: '/messages',
	});

	return Collection;
});