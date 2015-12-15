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
            var tagsXmlChildsCommon = paramOptionTags.tagsXmlChildsCommon;
            var selector = tagNameContainer + ' ' + tagNameFirstChild;
            var selectorChildsCommon = null;
            var members = $xmlDoc.find(selector);
            var strXmlCategory = members[0].parentElement.getAttribute('catagory') || '';
            var hashNodeAttributes = {};
            var nodeTagName = '';
            var strAttribute = '';
            var strAttributeName = '';
            var strAttributeValue = '';
            var nodeValue = '';
            var intXmlCategoryCounter = 0; 
    
            hashElementNodes['strNameTitle'] = title; // TODO: needs clean-up Should be the same work-flow as using configMapping.js

            for(var i = 0, len = members.length; i < len; i++){
                arry.push(members[i]);
            }

            /* TODO: Remove if else. all XML processing should be the same */
            if( (strXmlCategory === 'board') || (strXmlCategory === 'interestGroups') ){ 
                for(var i = 0, len = arry.length; i < len; i++){                   
                   $(arry[i].childNodes).each(function(index, elm){
                        if(elm.nodeType == 1){
                          selectorChildsCommon = tagsXmlChildsCommon[intXmlCategoryCounter++];
                          hashElementNodes[selectorChildsCommon] = elm.firstChild.nodeValue;                           
                          elm.hasAttributes() ? hashNodeAttributes['class'] = elm.getAttribute('class') : '';                          
                        } 
                   });
                   intXmlCategoryCounter = 0; // reset to beginning of tag array                   
                   arryElementNodes.push(hashElementNodes); // forming hash for underscore template
                   hashElementNodes = new Object; // hashes are reference vars, so, clear it, so we do not overwrite previous values
                } // End for     

            }else{
                for(var i = 0, len = arry.length; i < len; i++){
                    
                        $(arry[i].childNodes).each(function(index, elm){

                            if(this.nodeType == 1){
                               nodeValue = elm.firstChild.nodeValue; 
                               nodeTagName = elm.nodeName;

                               if(elm.attributes.length > 0){ // allow XML tag to hava a single attribute
                                strAttributeName = elm.attributes[0].nodeName;
                                strAttributeValue = elm.attributes[0].nodeValue;
                               }else{
                                strAttributeName = '';
                                strAttributeValue = '';
                               }

                               hashElementNodes = {'strXmlCategory':strXmlCategory,
                                'strTagName':nodeTagName, 
                                'strAttributeName':strAttributeName, 
                                'strAttributeValue':strAttributeValue,
                                'strName':nodeValue, 
                                'strNameTitle':title};

                               arryElementNodes.push(hashElementNodes);                         
                            }
                        }); 
                    
                } // End for               

            }

            return {pageTitle:title, pageData:arryElementNodes, hashNodeClass:hashNodeAttributes};
        } // End parseXmlToJson
    };
    return{
        fnc:_fnc
    }
});