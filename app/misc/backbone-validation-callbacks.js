define(['jquery', 'underscore', 'backbone', 'backbone_validation'], function(
			$, _, Backbone) {
	'use strict';

	_.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                /*$group = $el.closest('.form-group');*/
                $group = $el.closest('.control-group');
        
            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                /*$group = $el.closest('.form-group');*/
                $group = $el.closest('.control-group');
        
            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });
});