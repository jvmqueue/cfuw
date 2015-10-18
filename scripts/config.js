requirejs.config({
    paths:{ // only load if AMD defines the alias as a dependency
        "jQuery":["../bower_components/jquery/dist/jquery.min"],
        "Backbone":["../bower_components/backbone/backbone"],
        "underscore":["../bower_components/underscore/underscore"],
        "bootstrap":["../bower_components/bootstrap/dist/js/bootstrap"],
        "util":["util/util"],
        "exception":["exception/exception"],
        "homeModel":["model/home"],
        "boardModel":["model/boardMembers"],
        "missionStatementModel":["model/missionStatement"],
        "homeView":["view/home"],
        "basePath":["basePath"]
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
    deps:['main'] // where our program begins execution
});