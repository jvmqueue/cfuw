<?php 

// THE BELOW LINE STATES THAT IF THE SUBMIT BUTTON
// WAS PUSHED, EXECUTE THE PHP CODE BELOW TO SEND THE 
// MAIL. IF THE BUTTON WAS NOT PRESSED, SKIP TO THE CODE
// BELOW THE "else" STATEMENT (WHICH SHOWS THE FORM INSTEAD).


// REPLACE THE LINE BELOW WITH YOUR E-MAIL ADDRESS.
$to = 'glenn.blankenship@gmail.com';
$subject = 'Contact Us: Canadian Federation University of Women';

// NOT SUGGESTED TO CHANGE THESE VALUES
$message = $_GET ['message'];
$from = $_GET['from'];
$fromGet = $_GET['message'];
$fromGetEmail = $_GET['email'];



// $headers = 'From: ' . $_POST[ "from" ] . PHP_EOL ;

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";

// More headers
$headers .= 'From: <info@cfuw-saskatoon.org>' . "\r\n";
$headers .= 'Cc: glenn.blankenship@gmail.com' . "\r\n";

$headers .= "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" . "\r\n";


$sendFinalMessage = 'From: ' . $from . "\r\n email: " . $fromGetEmail . '  Message:  ' . $message;
// mail ( $to, $subject, $message, $headers ) ;
mail($to, 'CFUW Contact Us: '. $subject, $sendFinalMessage); 

// THE TEXT IN QUOTES BELOW IS WHAT WILL BE 
// DISPLAYED TO USERS AFTER SUBMITTING THE FORM.
echo "Your e-mail has been sent! You should receive a reply within 24 hours!" ;



?>