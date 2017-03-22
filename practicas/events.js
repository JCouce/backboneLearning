//Lo envolvemos todo en una funcion anonima no se para que....
(function() {
    //Aqui es donde se define el namespace, la usaremos para organizar nuestras vistas,modelos y colleciones
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };
    //Funcion que devuelve una template si le pasas una id correcta
    window.template = function(id) {
        return _.template($('#' + id).html());
    };


    // Person Model
    App.Models.Person = Backbone.Model.extend({
        defaults: {
            name: 'Guest User',
            age: 30,
            occupation: 'worker'
        }
    });

    // A List of People
    App.Collections.People = Backbone.Collection.extend({
        model: App.Models.Person
    });


    // View for all people (tiene las funciones necesarias para que nuevos elementos sean añadidos)
    App.Views.People = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },

        render: function() {
            this.collection.each(this.addOne, this);

            return this;
        },

        addOne: function(person) {
            var personView = new App.Views.Person({ model: person });
            this.$el.append(personView.render().el);
        }
    });

    // The View for a Person 
    //Este es el elemento que mas metodos y parametros tiene ya que cada vez que se 
    //imprime una persona en pantalla va a tener esta forma
    //Si queremos cambiar la forma tendremos que generar una nueva vista (o hacer algo con las templates if(){}....)
    //No tiene nada que ver con añadir nueva persona(excepto que esto es una vista de personas..)
    App.Views.Person = Backbone.View.extend({
        tagName: 'li',
        //llamamos a la funcion template(id);
        template: template('personTemplate'),

        //A continuacion añadimos un evento a todos los elementos que se creen con este modelo
        events: {
            'click .edit': 'editPerson',
            'click .delete': 'deletePerson'
        },
        //Definimos la funcion de edicion que se ejecutara on click de .edit
        editPerson: function() {
            var newName = prompt("Please enter the new name", this.model.get('name'));
            //Si está vacio sal y no cambies nada
            if (!newName) return;
            this.model.set('name', newName);
        },
        deletePerson: function() {
            this.model.destroy();
        },
        //Añadimos un listener a todos los objetos que se creen con este modelo
        //El listener escuchará los cambios y se imprimira de nuevo a si mismo
        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        //Imprimir
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        //Eliminar
        remove: function() {
            this.$el.remove();
        },
    });
    //Necesitamos otra nueva vista singular para añadir personas
    App.Views.AddPerson = Backbone.View.extend({
        el: '#addPerson',
        //Cuando ocurra el evento submit se activa la funcion ... submit! declarada mas abajo.
        events: { 'submit': 'submit' },
        //Funcion submit, usamos (e) por que es una funcion que se activa con un evento (submit), 
        //es el objeto con los datos del evento
        submit: function(e) {
            //esto hay que mirarlo
            e.preventDefault();
            //Javascript basico que hay que saber (coger el texto de un input)
            var newPersonName = $(e.currentTarget).find('input[type=text]').val();
            //Caja persona para ir añadiendo las nuevas personas
            //Una vez que se añade a la coleccion la re utilizamos para coger la nueva persona
            var person = new App.Models.Person({ name: newPersonName });
            //Añadir la nueva persona a la coleccion (no se por que this...)
            this.collection.add(person);
        }
    });

    var peopleCollection = new App.Collections.People([{
            name: 'Mohit Jain',
            age: 26
        },
        {
            name: 'Taroon Tyagi',
            age: 25,
            occupation: 'web designer'
        },
        {
            name: 'Rahul Narang',
            age: 26,
            occupation: 'Java Developer'
        }
    ]);



    var addPersonView = new App.Views.AddPerson({ collection: peopleCollection })
    var peopleView = new App.Views.People({ collection: peopleCollection });
    //$("#personas").html(peopleView.render().el);

    $(document.body).append(peopleView.render().el);
})();