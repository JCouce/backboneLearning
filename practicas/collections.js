//Funcion para gestionar las templates, devuelve una template por id
var template = function(id) {
    return _.template($('#' + id).html());
};



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

var PersonView = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    id: 'person-id',
    my_template: template('personTemplate'),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.my_template(this.model.toJSON()));
    }


});

//Declaramos la nueva Collection
var PeopleCollection = Backbone.Collection.extend({
    model: Person
});
//Declaramo la nueva colleccion de vistas
var PeopleView = Backbone.View.extend({
    tagName: 'ul'
});



//Instanciamos la nueva coleccion
var peopleCollection = new PeopleCollection();
//crear y añadir objetos a las colecciones
//Persona 1
var person = new Person();
var personView = new PersonView({ model: person });
peopleCollection.add(person);
//Persona 2
var person2 = new Person({ name: "Mohit Jain", age: 25, occupation: "Software Developer" });
var personView2 = new PersonView({ model: person2 });
peopleCollection.add(person2);

//Inner html para sobreescribir todo en el body, si quieres que quede bonito curra aqui
$("#personas").html(personView.el);






//Otra manera de añadir objetos a la coleccion (advanced iteration over the model)
for (i = 0; i >= 1; i++) {
    var peopleCollection2 = new PeopleCollection([

        {
            name: 'Mohit Jain',
            age: 20 + i
        },
        {
            name: 'Taro' + i + 'Tyagi',
            age: 25,
            occupation: 'web designer'
        },
        {
            name: 'Rahul Narang',
            age: 26,
            occupation: 'Java Developer'
        }
    ]);
}