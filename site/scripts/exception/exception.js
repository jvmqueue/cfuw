define(['jQuery'], function($, undefined){
    var w = window, d = document;
    var _fnc = {
        http:function(options){
            var strServerException = options.exception.responseText;
            var strCfuwException = options.cfuwException; // custom exception in JS
            var nodeExist = d.getElementsByTagName('body')[0];
            var frag = d.createDocumentFragment();
            var nodeText = d.createTextNode(strCfuwException);
            var nodeNew = d.createElement('h2');
            nodeNew.setAttribute('class', 'exception');
            nodeNew.appendChild(nodeText);

            if(strServerException.indexOf('<div') > 0){ // server exception thrown
                var nodeServerException = d.createElement('p');
                nodeServerException.setAttribute('class', 'exception');
                nodeServerException.innerHTML = strServerException;
                frag.appendChild(nodeServerException);
            }
            
            frag.appendChild(nodeNew);
            nodeExist.appendChild(frag);
        }
    };
    return{
        fnc:_fnc
    }
});