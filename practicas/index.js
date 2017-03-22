(function($) {
    var ListView = Backbone.View.extend({
        el: $('body'), // attaches `this.el` to an existing element
        initialize: function() {
            _.bindAll(this, 'render');
            this.render(); // not all views are self-rendering. This one is.
        },
        render: function() {
            $(this.el).append("<div> hello world </div>");
        }
    });
    var ListView2 = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            _.bindAll(this, 'renderizar');
            this.renderizar()
        },
        renderizar: function() {
            $(this.el).append("<div> hello world </div>")
        }
    })
    var listView = new ListView();
    var listView2 = new ListView2();
})(jQuery);