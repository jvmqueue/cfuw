define([], function(){
    var strBasePath = {
        local:'../cfuwPublisher/data/',
        dev:'../cfuwPublisher/data/'
    };

    var _basePath = function(){
        var strHostName = window.location.hostname;
        return strHostName === '127.0.0.1' ? strBasePath.local : strBasePath.dev;    
    };
    return {basePath:_basePath}
});