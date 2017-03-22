var Sidebar = Backbone.Model.extend({
    promptColor: function() {
        var cssColor = prompt("Please enter a CSS color:");
        this.set({ color: cssColor });
        $('#sidebar').trigger('change');
    },
    changeColor: function() {
        $('#sidebar').css('background', this.model.get('color'));
    },
    events: {
        'change #sidebar': this.changeColor
    }
});
window.sidebar = new Sidebar;

/*sidebar.on('change:color', function(model, color) {
    $('#sidebar').css({ background: color });
});*/
sidebar.promptColor();