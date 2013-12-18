require.config({
    paths: {
        domReady: 'vendor/require/domReady',
        text: 'vendor/require/text',
        jquery: 'vendor/jquery/jquery-2.0.3.min',
        underscore: 'vendor/underscore/underscore-min',
        backbone: 'vendor/backbone/backbone',
        backbone_modelbinder: 'vendor/backbone/Backbone.ModelBinder.min',
        backbone_validation: 'vendor/backbone/backbone-validation-amd-min',
        backbone_faux_server: 'vendor/backbone/backbone-faux-server',
        bootstrap: 'vendor/bootstrap/js/bootstrap.min'
    }, shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        bootstrap: ['jquery'],
    }
});

require(['domReady', 'jquery', 'underscore', 'contact-us/view', 'backbone_faux_server',
         'misc/backbone-validation-callbacks'], function(
            domReady, $, _, ContactUsView, fauxServer) {
    fauxServer.addRoute('submitMessage', '/messages', 'POST', function(context){
        if (context.data.text === 'error') {
            return 'error';
        } else {
            context.data.id = 1;
            return context.data;
        }
    }).setLatency(1000, 2000);

    domReady(function () {
        $('body').append(new ContactUsView().render().$el);
    });
});