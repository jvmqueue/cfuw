define(['jQuery'], function($undefined){
    
    var TAG_NAME_DOC_FIRST_CHILD = 'page'; // private member
    var TAG_NAME_DOC_TITLE = 'title'; // private member

    var _fnc = {
        noCache:function(){
            return new Date().getMilliseconds();
        },
        getElementNode:function(paramNode, paramArray){
            var node = paramNode;
            var ELEMENT = 1;
            var arry = paramArray;
            var strNameTitle = '';
            var strValueTitle = '';
            var strName = '';
            var strValue = '';
            if(node.firstChild === ELEMENT){
                console.group('UTIL GET ELEMENT NODE');
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
        parseXmlToJson:function(paramXml, paramOptionTags){
            var $xmlDoc = $(paramXml);
            var arry = [];
            var selector = TAG_NAME_DOC_FIRST_CHILD + ' ' + TAG_NAME_DOC_TITLE;
            var title = $xmlDoc.find(selector)[0].innerHTML;
            var tagNameContainer = paramOptionTags.childContainerTag;
            var tagNameFirstChild = paramOptionTags.firstChildTag;
            selector = tagNameContainer + ' ' + tagNameFirstChild;
            var members = $xmlDoc.find(selector);
            var nodeTagName = '';
            var nodeValue = ''; 

            for(var i = 0, len = members.length; i < len; i++){
                var node = _fnc.getElementNode(members[i], arry);
            }

            return {pageTitle:title, pageData:arry};
        } // End parseXmlToJson
    };
    return{
        fnc:_fnc
    }
});