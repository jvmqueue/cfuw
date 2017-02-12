define(['jQuery'], function($, undefined){
    'use strict';
    var w = window, d = document;    
    var TAG_NAME_DOC_FIRST_CHILD = 'page'; // private member
    var TAG_NAME_DOC_TITLE = 'title'; // private member
    var mNewWindow = null;
    var ELEMENT = 1;
    

    var _fnc = {
        noCache:function(){
            return new Date().getMilliseconds();
        },
        httpSend:function(options){
            var headers = options.hashHeaders;
            var url = options.url;
            var req = $.ajax({
                url:url,
                method:'POST',
                headers:headers,
                dataType:'text',
                success:function(data){
                     $(options.selector).triggerHandler('http:response', [data]); // data is the HTTP Response
                }                
            });
        },
        appendFragment:function(options){
            var strText = options.strText;
            var strIdNodeExists = options.strIdNodeExists;
            var nodeExist = d.getElementById(strIdNodeExists);
            var nodeNew = d.createElement('div');
            var nodeText = d.createTextNode(strText);
            var strAttribute = nodeExist.getAttribute('class');
            strAttribute= strAttribute.replace('hide', '');
            nodeNew.appendChild(nodeText);
            nodeExist.appendChild(nodeNew);
            nodeExist.setAttribute('class', strAttribute);    
        },
        getElementNode:function(paramNode, paramArray, paramIndex){
            var node = paramNode;
            var arry = paramArray;
            var strNameTitle = '';
            var strValueTitle = '';
            var strName = '';
            var strNodeName = '';
            var strNodeValue = '';
            var strValue = '';       

            if(node.childNodes.length > 0){
                   paramArray.push(node.childNodes);
            }
        },
        setAttributes:function(paramHashElementNodes, paramElm){
            var hash = paramHashElementNodes;
            var elm = paramElm;
            for(var i = 0, len = elm.attributes.length; i < len; i++){
                hash[elm.attributes[i].name] = elm.attributes[i].value;
            }
            return hash;
        },
        getChildNodes:function(paramParentNode, paramHashElementNodes){
          var nodeXMLFragment = paramParentNode;

        },
        showIconRelativeToScroll:function(options){
          var blnNodeInViewDoNotShow = !!( options.nodeInViewDoNotShow );
          var STR_CSS_ARROW_FADE_IN = options.jsCssClassToAdd;
          var $nodeToAddJsCssClass = options.$nodeToAddJsCssClass;
          
          if(blnNodeInViewDoNotShow === true){ // do not show arrow icon
            $nodeToAddJsCssClass.removeClass(STR_CSS_ARROW_FADE_IN);
            return void(0); 
          }
          
          /* optimization: do not access if contact us is in view */
          var intViewFromTop = $(window).scrollTop();
          var intWindowWidth = $(window).width(); 
          var intViewFromTopRatio = intViewFromTop/intWindowWidth;
          var $nodeArrowIcon = $nodeToAddJsCssClass;
          var blnAddJsClass = false;

          if( intViewFromTopRatio >= 1.5 ){ // the wider the screen, the longer we wait for icon to show
              blnAddJsClass = true;
          }

          if(blnAddJsClass === true){
            $nodeArrowIcon.addClass(STR_CSS_ARROW_FADE_IN);
          }else{
            $nodeArrowIcon.removeClass(STR_CSS_ARROW_FADE_IN);
          }
        },        
        parseXmlToJson:function(paramXml, paramOptionTags){
            var $xmlDoc = $(paramXml);
            var arry = [];
            var arryElementNodes = [];
            var hashElementNodes = {};
            var selectorPageTitle = TAG_NAME_DOC_FIRST_CHILD + ' ' + TAG_NAME_DOC_TITLE;
            var nodeTitle = $xmlDoc.find(selectorPageTitle)[0];
            var title = $xmlDoc.find(selectorPageTitle)[0].innerHTML;
            var tagNameContainer = paramOptionTags.childContainerTag;
            var tagNameFirstChild = paramOptionTags.firstChildTag;
            var tagsXmlChildsCommon = paramOptionTags.tagsXmlChildsCommon;
            var selector = tagNameContainer + ' ' + tagNameFirstChild;

            var members = $xmlDoc.find(selector);
            var hashNodeAttributes = {};
            var nodeTagName = '';
            var strAttribute = '';
            var strAttributeName = '';
            var strAttributeValue = '';
            var strNodeValue = null;
            var strNodeName = null;
            var hashNodeName = {};
            var nodeValue = '';
            var intXmlCategoryCounter = 0; 
    
            hashElementNodes['strNameTitle'] = title;
            hashElementNodes = _fnc.setAttributes(hashElementNodes, nodeTitle);

            for(var i = 0, len = members.length; i < len; i++){ // push each XML common parent nodes to arry
                arry.push(members[i]);
            } 
            
            for(var i = 0, len = arry.length; i < len; i++){ // access each common parent node and push attributes to hash
               $(arry[i].childNodes).each(function(index, elm){
                    if(elm.nodeType == 1){

                      if(elm.hasAttributes()){
                        hashElementNodes = _fnc.setAttributes(hashElementNodes, elm);
                      }
                      strNodeValue = elm.firstChild.nodeValue;
                      strNodeName = elm.nodeName;
                      var nodeNameChilds = elm.nodeName;
                      if( elm.hasChildNodes() ){ // testing for generic child nodes. Most all XML nodes have children
                        _fnc.getChildNodes(elm, hashElementNodes);
                        console.group('GET CHILD NODES');
                          console.log('elm.nodeName:\t', elm.nodeName);
                         console.groupEnd(); 

                      }
                      hashElementNodes[elm.nodeName] = strNodeValue;
                      hashElementNodes['strNodeName'] = strNodeName;
                    } 
               });
               intXmlCategoryCounter = 0; // reset to beginning of tagsXmlChildsCommon array                   

               arryElementNodes.push(hashElementNodes); // forming hash for underscore template
               hashElementNodes = new Object; // hashes are reference vars, so, clear it. We do not overwrite previous values
            } // End for  

            return {pageTitle:title, pageData:arryElementNodes, hashNodeClass:hashNodeAttributes};
        }, // End parseXmlToJson
        overridejQueryValidatorRules:function(options){
            var strCase = options.type;
            var strIdInput = options.strIdInput;

            switch(strCase){
                case 'email':
                    /* Override jQuery validator's email regEx */
                    jQuery.validator.addMethod(strCase, function(){ // in template, not always in the DOM, so, must bind here
                        var element = d.getElementById(strIdInput);
                        var value = element.value;
                        return this.optional( element ) || /^[a-zA-Z]([a-zA-Z0-9_\-])+([\.][a-zA-Z0-9_]+)*\@((([a-zA-Z0-9\-])+\.){1,2})([a-zA-Z0-9]{2,40})$/.test( value );
                    });
                  break;
                case 'minlength':
                    /* Override jQuery validator's minlength regEx */
                    jQuery.validator.addMethod(strCase, function(){ // in template, not always in the DOM, so, must bind here
                        var element = d.getElementById(strIdInput);
                        var value = element.value;
                        var blnIsValid = false;
                        var intWordCount = value.match(/\w+/g).length; // return number of words

                        intWordCount > 2 ? blnIsValid = true :  blnIsValid = false;     

                        return this.optional( element ) || blnIsValid;
                    });     


            } // End switch
        }, // End overridejQueryValidatorRules()
        listenerOpenSmallWindow:function(e){ // if small window open, clicking on link replaces small window URL
          var node = e.target;
          var strId = node.getAttribute('id');
          var strUrl = node.dataset.href; // data-href attribute
          var windows = {width:827, height:363};
          mNewWindow = window.open(strUrl,'name','height='+windows.height+',width='+windows.width);
          if(window.focus){ mNewWindow.focus(); }
          return false;
        } // End listenerOpenSmallWindow
    };
    return{
        fnc:_fnc
    }
});