requirejs.config({
    paths:{ // only load if AMD defines the alias as a dependency
        "jQuery":["../bower_components/jquery/dist/jquery.min"],
        "Backbone":["../bower_components/backbone/backbone"],
        "underscore":["../bower_components/underscore/underscore"],
        "bootstrap":["../bower_components/bootstrap/dist/js/bootstrap.min"],
        "jQueryValidation":["../bower_components/jquery-validation/dist/jquery.validate"],
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
        "newsModel":["model/news"],
        "meetingsModel":["model/meetings"],
        "eventsModel":["model/events"],
        "interestGroupsModel":["model/interestGroups"],
        "scholarshipsModel":["model/scholarships"],
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
            deps:['jQuery', 'jQueryValidation']
        },
        'template':{ // loading template will load dependencies, even if template.js does not call bootstrap explicitly
            deps:['underscore', 'regex', 'bootstrap']
        } 
    },
    deps:['main', 'bootstrap'] // where our program begins execution
});