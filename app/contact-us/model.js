define(['backbone', 'backbone_validation'], function(Backbone) {
	'use strict';

	var Model = Backbone.Model.extend({
		validation: {
			name: {
				required: true,
				minLength: 1,
				msg: 'Please enter your name',
			},
			email: {
				required: true,
				pattern: 'email',
				msg: 'Please enter a valid e-mail',
			},
			text: {
				minLength: 1,
				msg: 'Please enter the message',
			}
		}
	});

	return Model;
});