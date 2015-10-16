define([], function(){
    var strBasePathLocal = 'data/';
    var strBasePathDev = '../CFUW_Malaika/data/';
    var _basePath = function(){
        var strHostName = window.location.hostname;
        return strHostName === '127.0.0.1' ? strBasePathLocal : strBasePathDev;    
    };
    return {basePath:_basePath}
});