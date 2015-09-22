define(['jQuery'], function($, undefined){
    var w = window, d = document;
    var _fnc = {
        http:function(options){
            console.log('options.exception:\t', options.exception);
            var frag = d.createDocumentFragment();
            var nodeNew = d.createElement('div');
            var nodeExist = d.getElementsByTagName('body')[0];
            var strException = options.exception.responseText;

            nodeNew.setAttribute('class', 'exception');
            nodeNew.innerHTML = strException;
            frag.appendChild(nodeNew);
            nodeExist.appendChild(frag);
        }
    };
    return{
        fnc:_fnc
    }
});