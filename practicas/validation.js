var Person = Backbone.Model.extend({
    defaults: {
        name: 'Guest User',
        age: 23,
        occupation: 'Worker'
    },
    validate: function(attributes) {
        if (attributes.age < 0) {
            return 'Age must be positive.';
        }

        if (!attributes.name) {
            return 'Every person must have a name.';
        }
    },
    work: function() {
        return this.get('name') + ' is working.';
    }

});

var person = new Person;

person.on('invalid', function(model, error) {
    console.log(error); // printing the error message on console.
});
/**
 *  Para invocar a la validacion es necesario utilizar el metodo object.save() o el metodo object.set()
 * pasándole el parametro {validate:true}
 */