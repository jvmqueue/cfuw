define([], function(){
    var strBasePath = {
        local:{working:'../CFUW_Publisher/data/', fallback:'data/'},
        dev:{working:'../CFUW_Publisher/data/', fallback:'data/'}
    };
    var strHostName = window.location.hostname;
    var strWorking = null;
    var strFallBack = null;
    var _basePath = null;

    if(strHostName === '127.0.0.1'){
        strWorking = strBasePath.local.working
        strFallBack = strBasePath.local.fallback
    }else{
        strWorking = strBasePath.dev.working
        strFallBack = strBasePath.dev.fallback            
    }
    _basePath = {working:strWorking, fallback:strFallBack};

    return {dir:_basePath}
});