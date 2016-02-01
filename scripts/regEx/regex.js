define([''], function(undefined){  // no dependencies
    'use strict';

    var _fnc = {
        blnNotPrintable:function(paramString){
            return /[\x00-\x1F]/.test(paramString);
        },
        blnIsAlpha:function(paramString, paramIntPosition){
            var UNICODE_FIRST_ALPHA = 65;
            var UNICODE_LAST_ALPHA = 122;
            var unicodeCharVal = paramString.charCodeAt( paramString.charAt(paramIntPosition) );        
            return ( (unicodeCharVal >= UNICODE_FIRST_ALPHA) && (unicodeCharVal <= UNICODE_LAST_ALPHA) );
        },
        blnIsNumeric:function(paramString, paramIntPosition){
            return ( !isNaN( paramString.charAt(paramIntPosition) ) );
        },
        blnIsWhiteSpace:function(paramString){
            return ( /[\x00-\x08\x0E-\x1F]/.test(paramString) );
        },
        blnIsInString:function(paramString, paramStringToFind){
            var reg = new RegExp(paramStringToFind);
            return ( reg.test(paramString) );       
        },
        blnIsParenthesis:function(paramString, paramIntPosition){
            var UNICODE_LEFT = 40;
            var UNICODE_RIGHT = 41;         
            var unicodeCharVal = paramString.charCodeAt( paramString.charAt(paramIntPosition) );        
            return ( (unicodeCharVal === UNICODE_LEFT) || (unicodeCharVal === UNICODE_RIGHT) );
        },
        getIdFromString:function(paramString){
            var reg = /(^|\W)id="(\w+)/g;       
            var arrayReg = reg.exec(paramString);
            var strId = arrayReg[2];
            return strId;
        },
        getAfterSubString:function(paramString, paramSubString){
            var strMatch = paramString.match(paramSubString);
            var strSplit = paramString.split(strMatch[0]);
            return strSplit[1];            
        },        
        strRemoveWhiteSpace:function(paramString){
            var reg = /(\s)/gi; 
            if(paramString === null){
                return 'regex util.fnc paramString not received as parameter';
            }
            return paramString.replace(reg, '');
        },
        strReplace:function(paramString, paramStringToReplace, paramReplacement){
            var reg = new RegExp(paramString); 
            return paramString.replace(paramStringToReplace, paramReplacement);
        },
        blnEmailIsValidFormat:function(paramString){            
            return /^[a-zA-Z]([a-zA-Z0-9_\-])+([\.][a-zA-Z0-9_]+)*\@((([a-zA-Z0-9\-])+\.){1,2})([a-zA-Z0-9]{2,40})$/.test(paramString);
        },
        strReplaceAllSpecialChars:function(paramString){
            /*Remove all Characters*/
            // return paramString.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\n\/]/gi, ' ');
            /*Remove all Characters, NOT periods or commas or apostrophes or @*/
            return paramString.replace(/[~!#$%^&*()_|+\-=÷¿?;:"<>\{\}\[\]\\\n\/]/gi, ' ');
        }                
    };
    return{
        fnc:_fnc
    };


}); // End define