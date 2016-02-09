define([], function(){
    var strBasePath = {
        local:{working:'../CFUW_Publisher/data/', fallback:'data/'},
        dev:{working:'../CFUW_Publisher/data/', fallback:'data/'}
    };
    var strHostName = window.location.hostname;
    var strWorking = strBasePath.dev.working;
    var strFallBack = strBasePath.dev.fallback;
    var _basePath = null;

    if(strHostName === '127.0.0.1'){
        strWorking = strBasePath.local.working
        strFallBack = strBasePath.local.fallback
    }
    
    _basePath = {working:strWorking, fallback:strFallBack};

    return {dir:_basePath}
});

