requirejs.config({
    paths:{ // only load if AMD defines the alias as a dependency        
        "affiliationsModel":["model/affiliations"],
        "Backbone":["../bower_components/backbone/backbone"],
        "basePath":["basePath"],
        "boardModel":["model/boardMembers"],
        "booksaleModel":["model/bookSale"],
        "bootstrap":["../bower_components/bootstrap/dist/js/bootstrap.min"],
        "commonModelDefaults":["model/commonModelDefaults"],
        "contactUsModel":["model/contactUs"],
        "eventsModel":["model/events"],
        "exception":["exception/exception"],
        "homeModel":["model/home"],
        "homeView":["view/home"],
        "interestGroupsModel":["model/interestGroups"],
        "jQuery":["../bower_components/jquery/dist/jquery.min"],
        "jQueryValidation":["../bower_components/jquery-validation/dist/jquery.validate"],
        "meetingsModel":["model/meetings"],
        "membershipApplicationModel":["model/membershipApplication"],
        "missionStatementModel":["model/missionStatement"],        
        "newsModel":["model/news"],        
        "regEx":["regEx/regex"],
        "scholarshipsModel":["model/scholarships"],
        "underscore":["../bower_components/underscore/underscore"],
        "util":["util/util"]        
    },
    shim:{
        'Backbone':{ // loading Backbone will load dependencies
            deps:['jQuery', 'underscore', 'bootstrap']
        },        
        'bootstrap':{
            deps:['jQuery']
        },
        'jQuery':{
            exports:'$'
        },        
        'template':{ // loading template will load dependencies, even if template.js does not call bootstrap explicitly
            deps:['underscore', 'regex', 'bootstrap']
        },                
        'underscore':{
            exports:'_'
        },
        'util':{
            deps:['jQuery', 'jQueryValidation']
        }
    },
    deps:['main', 'bootstrap'] // where our program begins execution
});