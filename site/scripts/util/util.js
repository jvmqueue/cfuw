define(['jQuery'], function($undefined){
    var _fnc = {
        getElementNode:function(paramNode, paramArray){
            var node = paramNode;
            var ELEMENT = 1;
            var arry = paramArray;
            var strNameTitle = '';
            var strValueTitle = '';
            var strName = '';
            var strValue = '';

            if(node.firstChild === ELEMENT){
                console.group('GET ELEMENT NODE');
                    console.log('node.firstChild:\t', node.firstChild);
                   console.groupEnd(); 
            }else{
                strNameTitle = node.childNodes[0].nextElementSibling.nodeName;
                strValueTitle = node.childNodes[0].nextElementSibling.firstChild.nodeValue;
                strName = node.childNodes[1].nextElementSibling.nodeName;
                strValue = node.childNodes[1].nextElementSibling.firstChild.nodeValue;
                arry.push({strNameTitle:strValueTitle, strName:strValue});
            }
        },
        parseXmlToJson:function(paramXml){
            var $xmlDoc = $(paramXml);
            var arry = [];
            var title = $xmlDoc.find('page title')[0].innerHTML;
            var members = $xmlDoc.find('members member');
            var nodeTagName = '';
            var nodeValue = '';

            for(var i = 0, len = members.length; i < len; i++){
                var node = _fnc.getElementNode(members[i], arry);
            }
            return arry;
        } // End parseXmlToJson
    };
    return{
        fnc:_fnc
    }
});