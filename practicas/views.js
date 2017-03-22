//Definimos el modelo de personas (3 parametros y un metodo workk)
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
//Definimos la vista de personas
var PersonView = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    id: 'person-id',
    //definimos como va a ser la template (negrita con color rojo)
    my_template: _.template($('#personTemplate').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        //Cargamos el objeto en forma de json dentro de 'my_template' y lo metemos en $el
        this.$el.html(this.my_template(this.model.toJSON()));
    }


});

//Segunda creada por mi
var person = new Person();
var juan = new Person({ name: 'Juan', age: 10, occupation: 'guarda bosques' })

//segunda creada por mi
var personView = new PersonView({ model: person });
var juanView = new PersonView({ model: juan });

//Inner html para sobreescribir todo en el body, si quieres que quede bonito curra aqui
$("#personas").html(juanView.el);