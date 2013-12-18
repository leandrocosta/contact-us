define(['jquery', 'underscore', 'contact-us/view', 'backbone_faux_server',
        'misc/backbone-validation-callbacks'], function(
            $, _, ContactUsView, fauxServer) {
    'use strict';

    var run = function () {
        test('it should pass', function() {
            equal(1, 1, '1 === 1');
        });

        module('ContactUsView just created', {
            setup: function() {
                this.ajaxSpy = sinon.spy($, 'ajax');
                this.view = new ContactUsView();
                $('body').append(this.view.render().$el);
            },
            teardown: function() {
                this.view.remove();
                this.ajaxSpy.restore();
            }
        });

        test('it should initialize a model when created', function() {
            ok(this.view.model !== undefined);
        });

        test('it should validate model before post data', function() {
            $('.btn-primary', this.view.$el).click();

            ok($.ajax.notCalled);

            equal(
                $('[name="name"]', this.view.$el).closest('.control-group').find('.help-block').text(),
                this.view.model.validation.name.msg
            );
            equal(
                $('[name="email"]', this.view.$el).closest('.control-group').find('.help-block').text(),
                this.view.model.validation.email.msg
            );
            equal(
                $('[name="text"]', this.view.$el).closest('.control-group').find('.help-block').text(),
                this.view.model.validation.text.msg
            );
        });

        module('ContactUsView after enter valid inputs', {
            setup: function() {
                this.ajaxSpy = sinon.spy($, 'ajax');

                /*fauxServer.addRoute('submitMessage', '/messages', 'POST', function(context){
                    context.data.id = 1;
                    return context.data;
                });*/

                this.view = new ContactUsView();
                $('body').append(this.view.render().$el);
                $('[name="name"]', this.view.$el).val('n1').change();
                $('[name="email"]', this.view.$el).val('mail@example.com').change();
                $('[name="text"]', this.view.$el).val('t1').change();
            },
            teardown: function() {
                this.ajaxSpy.restore();
                //fauxServer.removeRoute('submitMessage');
                this.view.remove();
            }
        });

        test('it should bind model to form', function() {
            expect(3);

            equal(this.view.model.get('name'), 'n1');
            equal(this.view.model.get('email'), 'mail@example.com');
            equal(this.view.model.get('text'), 't1');
        });

        test('it should post data to server when submit called', function() {
            $('button', this.view.$el).click();
            ok($.ajax.calledOnce);
        });

        test('it should recreate model after submit', function() {
            expect(3);

            fauxServer.addRoute('submitMessage', '/messages', 'POST', function(context){
                context.data.id = 1;
                return context.data;
            });

            $('button', this.view.$el).click();

            equal(this.view.model.get('name'), 'n1');
            equal(this.view.model.get('email'), 'mail@example.com');
            equal(this.view.model.get('text'), undefined);

            fauxServer.removeRoute('submitMessage');
        });

        test('it should post data correctly to server', function() {
            expect(3);

            /*
             * credits: http://philfreo.com/blog/how-to-unit-test-ajax-requests-with-qunit-and-sinon-js/
             */
            var requests = [];
            var xhr = sinon.useFakeXMLHttpRequest();
            xhr.onCreate = $.proxy(function(xhr) {
                requests.push(xhr);
            });

            $('button', this.view.$el).click();

            var request = requests[0];

            equal(request.method, 'POST', 'MessageModel#save should send a POST');
            equal(request.url, '/messages', '... to /messages/ endpoint');
            deepEqual(
                JSON.parse(request.requestBody),
                {name:'n1', email:'mail@example.com', text:'t1'},
                '... with valid SMTP json');

            //equal(JSON.parse(request.requestBody).name, 'n1', '... with valid SMTP json');
            //equal(JSON.parse(request.requestBody).email, 'mail@example.com', '... with valid SMTP json');
            //equal(JSON.parse(request.requestBody).text, 't1', '... with valid SMTP json');
        });

        test('it should rerender after submit', function() {
            fauxServer.addRoute('submitMessage', '/messages', 'POST', function(context){
                context.data.id = 1;
                return context.data;
            });

            $('button', this.view.$el).click();

            equal($('[name="name"]', this.view.$el).val(), 'n1');
            equal($('[name="email"]', this.view.$el).val(), 'mail@example.com');
            equal($('[name="text"]', this.view.$el).val(), '');

            fauxServer.removeRoute('submitMessage');
        });
    };

    return {run: run};
});