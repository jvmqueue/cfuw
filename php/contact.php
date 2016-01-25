<?php 

// REPLACE THE LINE BELOW WITH YOUR E-MAIL ADDRESS.
$to = 'developer@cfuw-saskatoon.org';
$mSubject = 'CFUW Contact Us:' . "\t";

function get_header(){
    
    $arrayCompleteMessage = array();
    $strName = '';

    foreach (getallheaders() as $name => $value){
        
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
$newLine = "\r\n";
$arrayMessage = get_header();
// not using this, because email goes to spam
// $headerFrom = "From: <" . $arrayMessage['email'] . ">";

// Bug: Gmail does not accept emails having special characters
// $headerSender = "Reply-To: <" . $strEmail . ">" . "\r\n" . 'X-Mailer: PHP/' . phpversion();

/*Works providing no decimal in name*/
// $headerSender = "Reply-To: $strEmail" . "\r\n" . 'X-Mailer: PHP/' . phpversion();

$strEmail = trim($arrayMessage['email']);
$emailSubject = $mSubject . $arrayMessage['subject'];

/*Perform concatenation manually, because order is important*/
$strMessage = $mSubject . $arrayMessage['subject'] . $newLine;
$strMessage .= "First:\t" . $arrayMessage['first'] . $newLine;
$strMessage .= "Last:\t" . $arrayMessage['last'] . $newLine;
$strMessage .= "Email:\t" . $arrayMessage['email'] . $newLine;
$strMessage .= "Message:\r\n" . $arrayMessage['message'];

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile, $strMessage);
fwrite($myfile, $newLine. 'headerSender::::'. $headerSender);
fwrite($myfile, "\r\nstrEmail trimmed::::" . $strEmail);
fclose($myfile);                 

$objMail = mail($to, $emailSubject, $strMessage);
if(!$objMail){
    echo('Error: email failed');
}else{
    echo('Thank you for your e-mail. We will reply within 24 hours.');
}

?>