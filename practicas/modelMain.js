var Person = Backbone.Model.extend({
    defaults: {
        name: 'Guest User',
        age: 23,
        occupation: 'Worker'
    },
    work: function() {
        return this.get('name') + ' is working.';
    }

});

var person = new Person;

person.on('invalid', function(model, error) {
    console.log(error); // printing the error message on console.
});