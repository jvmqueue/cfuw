define([], function(){
    var strBasePath = 'data/';
    var _basePath = function(){
        return strBasePath;    
    };
    return {basePath:_basePath}
});