define([], function(){
    var strBasePath = {
        local:'data/',
        dev:'data/'
    };

    var _basePath = function(){
        var strHostName = window.location.hostname;
        return strHostName === '127.0.0.1' ? strBasePath.local : strBasePath.dev;    
    };
    return {basePath:_basePath}
});