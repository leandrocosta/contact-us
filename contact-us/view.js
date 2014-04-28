define(['jquery', 'underscore', 'backbone', 'contact-us/model', 'contact-us/collection',
        'text!contact-us/template.html', 'backbone_modelbinder', 'bootstrap'], function(
            $, _, Backbone, Model, ModelCollection, viewTemplate) {
    'use strict';

    var View = Backbone.View.extend({
        id: 'contact-us',

        className: 'modal fade',

        template: _.template(viewTemplate),

        collection: new ModelCollection(),

        //model: new Model({collection:new ModelCollection()}),
        //model: new Model({collection:collection}),
        model: new Model(),

        events: {
            'click .btn-primary': 'onSubmit',
        },

        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            Backbone.Validation.bind(this);
            this.collection.add(this.model);
        },

        close: function(){
            this._modelBinder.unbind();
        },

        remove: function() {
            /*
             * Remove the validation binding
             * See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
             */
            Backbone.Validation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
        },

        render: function() {
            this.$el.html(this.template).attr('role', 'dialog');
            this._modelBinder.bind(this.model, this.el);
            return this;
        },

        onSubmit: function(ev) {
            if (this.model.isValid(true)) {
                $('.alert', this.$el).removeClass('in');
                $('i', this.$el).removeClass('fa-thumbs-o-up fa-thumbs-o-down hidden').addClass('fa-spinner fa-spin');

                this.model.save(undefined, {
                    success:_.bind(function(model, result, xhr){
                        /*$('i', this.$el).removeClass('fa-spinner fa-spin').addClass('fa-thumbs-o-up');*/
                        $('i', this.$el).addClass('hidden');
                        $('.alert', this.$el).text(
                            "Thanks for your message. We'll get back to you shortly.").addClass('fade in');
                        //this.collection.reset();
                        this.model.unset('id');
                        this.model.unset('text');

                        setTimeout(_.bind(function(){
                            /*$('i', this.$el).addClass('hidden');*/
                            $('.alert', this.$el).removeClass('in');
                        }, this), 2000);
                    }, this), error:_.bind(function(model, xhr, options){
                        $('i', this.$el).removeClass('fa-spinner fa-spin').addClass('fa-thumbs-o-down');
                        //$('i', this.$el).addClass('hidden');
                        $('.alert', this.$el).text('Please, check your connection.').addClass('in');
                    }, this)}
                );
            }
        }
    });

    return View;
});
