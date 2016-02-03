<?php 
$toProd = 'info@cfuw-saskatoon.org'; /* Production only */
$toDev = 'developer@cfuw-saskatoon.org'; /* In Development */
$to = $toDev; /* Switch relative to environment */

$mSubject = 'CFUW Contact Us:' . "\t";

function get_request_headers(){
    
    $arrayCompleteMessage = array();
    $strName = '';
    $hashHeaders = getallheaders();

    foreach ($hashHeaders as $name => $value){
        
        $strName = strtolower($name);

        switch($strName){
            case 'contact-subject':   
                $arrayCompleteMessage['subject'] = $value;
                break;    
            case 'contact-first':   
                $arrayCompleteMessage['first'] =  $value;
                break;            
            case 'contact-last': 
                $arrayCompleteMessage['last'] =  $value;
                break;
            case 'contact-email': 
                $arrayCompleteMessage['email'] = $value;
                break;
            case 'contact-message': 
                $arrayCompleteMessage['message'] = $value;
                break;                
            default:
                // do nothing discovered header name we are not tracking                
        } // End switch
     
    }

    return $arrayCompleteMessage;
}

function main(){

    global $to, $mSubject;
    $newLine = "\r\n";

    $arrayMessage = get_request_headers();

    $headerSender  = 'MIME-Version: 1.0' . $newLine;
    $headerSender .= 'Content-type: text/plain; charset=UTF-8' . $newLine;
    $headerSender .= 'Return-Path: '. $to . $newLine;

    $strEmail = trim($arrayMessage['email']);
    $emailSubject = $mSubject . $arrayMessage['subject'];

    /* Perform concatenation manually, because order is important */
    $strMessage  = "First:\t" . $arrayMessage['first'] . $newLine;
    $strMessage .= "Last:\t" . $arrayMessage['last'] . $newLine;
    $strMessage .= "Email:\t" . $arrayMessage['email'] . $newLine;
    $strMessage .= "Message:\t" . $arrayMessage['message'];

    $strResponseMessage;

    $objMail = mail($to, $emailSubject, $strMessage, $headerSender);
    if(!$objMail){
        $strResponseMessage = 'Error: email failed';
    }else{
        $strResponseMessage = 'Thank you for your e-mail. We will reply within 24 hours.';
    }

    return $strResponseMessage;


} // End main

$strHTML_Message = main();
echo($strHTML_Message);

?>