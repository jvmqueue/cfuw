<?php 

// REPLACE THE LINE BELOW WITH YOUR E-MAIL ADDRESS.
$to = 'developer@cfuw-saskatoon.org';
$subject = 'Contact Us: Canadian Federation University of Women';

function get_header(){
    
    $arrayCompleteMessage = array();
    $strName = '';
    global $subject; // access global
    $arrayCompleteMessage['subject'] = $subject;

    foreach (getallheaders() as $name => $value){
        
        $strName = strtolower($name);

        switch($strName){
            case 'contact-first':   
                $arrayCompleteMessage['first'] = "First:\t" . $value;
                break;            
            case 'contact-last': 
                $arrayCompleteMessage['last'] = "Last:\t" . $value;
                break;
            case 'contact-email': 
                $arrayCompleteMessage['email'] = "Email:\t" . $value;
                break;
            case 'contact-message': 
                $arrayCompleteMessage['message'] = "Message:\t" . $value;
                break;                
            default:
                // do nothing discovered header name we are not tracking                
        } // End switch
     
    }

    return $arrayCompleteMessage;
}
$newLine = "\r\n";
$arrayMessage = get_header();

$headerFrom = "From: <" . $arrayMessage['email'] . ">"; // not using this, because email goes to spam
$emailSubject = $arrayMessage['subject'];

/*Perform concatenation manually, because order is important*/
// TODO: replace first space in email with @. And second space with .
$strMessage = $arrayMessage['subject'] . $newLine;
$strMessage .= $arrayMessage['first'] . $newLine;
$strMessage .= $arrayMessage['last'] . $newLine;
$strMessage .= $arrayMessage['email'] . $newLine;
$strMessage .= $arrayMessage['message'];

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile, $strMessage);
fwrite($myfile, "\r\nstrMessageStripped:");
fwrite($myfile, $strMessageStripped);
fclose($myfile);                 

mail($to, $emailSubject, $strMessage);


?>