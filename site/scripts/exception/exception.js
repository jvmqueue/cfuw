define(['jQuery'], function($, undefined){
    var w = window, d = document;
    var _fnc = {
        _createDocumentFragment:function(paramStrInnerHtml){
            var frag = d.createDocumentFragment();
            var nodeNew = d.createElement('div');
            var strException = paramStrInnerHtml;

            nodeNew.setAttribute('class', 'exception');
            nodeNew.innerHTML = strException;
            frag.appendChild(nodeNew);
            return frag;
        },
        http:function(options){
            var nodeExist = d.getElementsByTagName('body')[0];
            var strException = options.exception.responseText;
            var frag = _fnc._createDocumentFragment(strException);
            nodeExist.appendChild(frag);
        }
    };
    return{
        fnc:_fnc
    }
});