requirejs.config({
    paths:{ // only load if AMD defines the alias as a dependency
        "jQuery":["../bower_components/jquery/dist/jquery.min"],
        "Backbone":["../bower_components/backbone/backbone"],
        "underscore":["../bower_components/underscore/underscore"],
        "bootstrap":["../bower_components/bootstrap/dist/js/bootstrap"],
        "home":["model/home"]
    },
    shim:{
        'jQuery':{
            exports:'$'
        },
        'bootstrap':{
            deps:['jQuery']
        },
        'Backbone':{ // loading Backbone will load dependencies
            deps:['jQuery', 'underscore', 'bootstrap']
        },        
        'underscore':{
            exports:'_'
        },
        'util':{
            deps:['jQuery']
        },
        'main':{
            deps:['jQuery', 'Backbone', 'home']
        },
        'template':{ // loading template will load dependencies, even if template.js does not call bootstrap explicitly
            deps:['underscore', 'regex', 'bootstrap']
        } 
    },
    deps:['main'] // where our program begins execution
});