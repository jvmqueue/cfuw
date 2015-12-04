requirejs.config({
    paths:{ // only load if AMD defines the alias as a dependency
        "jQuery":["../bower_components/jquery/dist/jquery.min"],
        "Backbone":["../bower_components/backbone/backbone"],
        "underscore":["../bower_components/underscore/underscore"],
        "bootstrap":["../bower_components/bootstrap/dist/js/bootstrap.min"],
        "util":["util/util"],
        "regEx":["regEx/regex"],
        "exception":["exception/exception"],
        "homeModel":["model/home"],
        "boardModel":["model/boardMembers"],
        "commonModelDefaults":["model/commonModelDefaults"],
        "contactUsModel":["model/contactUs"],
        "missionStatementModel":["model/missionStatement"],
        "affiliationsModel":["model/affiliations"],
        "membershipApplicationModel":["model/membershipApplication"],
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
    deps:['main', 'bootstrap'] // where our program begins execution
});