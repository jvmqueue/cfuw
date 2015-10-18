define(['jQuery'], function($, undefined){

    var w = window, d = document;    
    var TAG_NAME_DOC_FIRST_CHILD = 'page'; // private member
    var TAG_NAME_DOC_TITLE = 'title'; // private member
    

    var _fnc = {
        noCache:function(){
            return new Date().getMilliseconds();
        },
        getElementNode:function(paramNode, paramArray, paramIndex){
            var node = paramNode;
            
            var ELEMENT = 1;
            var arry = paramArray;
            var strNameTitle = '';
            var strValueTitle = '';
            var strName = '';
            var strNodeName = '';
            var strValue = '';       

            if(node.childNodes.length > 0){
                   paramArray.push(node.childNodes);
            }
        },
        parseXmlToJson:function(paramXml, paramOptionTags){
            var $xmlDoc = $(paramXml);
            var arry = [];
            var arryElementNodes = [];
            var hashElementNodes = {};
            var selectorPageTitle = TAG_NAME_DOC_FIRST_CHILD + ' ' + TAG_NAME_DOC_TITLE;
            var title = $xmlDoc.find(selectorPageTitle)[0].innerHTML;
            var tagNameContainer = paramOptionTags.childContainerTag;
            var tagNameFirstChild = paramOptionTags.firstChildTag;
            var selector = tagNameContainer + ' ' + tagNameFirstChild;
            var members = $xmlDoc.find(selector);          
            var nodeTagName = '';
            var nodeValue = ''; 

            for(var i = 0, len = members.length; i < len; i++){
                arry.push(members[i]);
            }

            for(var i = 0, len = arry.length; i < len; i++){
                
                    $(arry[i].childNodes).each(function(index, elm){

                        if(this.nodeType == 1){
                           nodeValue = elm.firstChild.nodeValue; 
                           nodeTagName = elm.nodeName;

                           hashElementNodes = {'strTagName':nodeTagName, 'strName':nodeValue, 'strNameTitle':title};
                           arryElementNodes.push(hashElementNodes);                         
                        }
                    }); 
                
            } // End for               

            return {pageTitle:title, pageData:arryElementNodes};
        } // End parseXmlToJson
    };
    return{
        fnc:_fnc
    }
});