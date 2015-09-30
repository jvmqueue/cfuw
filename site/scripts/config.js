requirejs.config({
    paths:{ // only load if AMD defines the alias as a dependency
        "jQuery":["../bower_components/jquery/dist/jquery.min"],
        "Backbone":["../bower_components/backbone/backbone"],
        "underscore":["../bower_components/underscore/underscore"],
        "bootstrap":["../bower_components/bootstrap/dist/js/bootstrap"],
        "util":["util/util"],
        "exception":["exception/exception"],
        "homeModel":["model/home"],
        "missionStatementModel":["model/missionStatement"],
        "homeView":["view/home"]
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
        'template':{ // loading template will load dependencies, even if template.js does not call bootstrap explicitly
            deps:['underscore', 'regex', 'bootstrap']
        } 
    },
    deps:['controller'] // where our program begins execution
});