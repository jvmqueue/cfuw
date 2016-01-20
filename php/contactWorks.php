<?php 

// THE BELOW LINE STATES THAT IF THE SUBMIT BUTTON
// WAS PUSHED, EXECUTE THE PHP CODE BELOW TO SEND THE 
// MAIL. IF THE BUTTON WAS NOT PRESSED, SKIP TO THE CODE
// BELOW THE "else" STATEMENT (WHICH SHOWS THE FORM INSTEAD).
if ( isset ( $_POST [ 'buttonPressed' ] )){

// REPLACE THE LINE BELOW WITH YOUR E-MAIL ADDRESS.
$to = 'glenn.blankenship@gmail.com';
$subject = $_POST['subject'] ;

// NOT SUGGESTED TO CHANGE THESE VALUES
$message = $_POST ['message'];
$from = $_POST['from'];
// $headers = 'From: ' . $_POST[ "from" ] . PHP_EOL ;

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";

// More headers
$headers .= 'From: <info@cfuw-saskatoon.org>' . "\r\n";
$headers .= 'Cc: glenn.blankenship@gmail.com' . "\r\n";

$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


$sendFinalMessage = 'From: ' . $from . '  Message:  ' . $message;
// mail ( $to, $subject, $message, $headers ) ;
mail($to, 'CFUW Contact Us: '. $subject, $sendFinalMessage); 

// THE TEXT IN QUOTES BELOW IS WHAT WILL BE 
// DISPLAYED TO USERS AFTER SUBMITTING THE FORM.
echo "Your e-mail has been sent! You should receive a reply within 24 hours!" ;}

else{
?>
<form method= "post" action= "<?php echo $_SERVER [ 'PHP_SELF' ] ;?>" />
  <table>
    <tr>
      <td>Subject:</td>
      <td><input name= "subject" type= "text"/></td>      
    </tr>
    <tr>
      <td>Your e-mail address:</td>
      <td><input name= "from" type= "text"/></td>
    </tr>
    <tr>
      <td>Your message: </td>
      <td><textarea name= "message" cols= "20" rows= "6"></textarea></td>
    </tr>
    <tr>
      <td></td>
      <td><input name= "buttonPressed" type= "submit" value= "Send E-mail!" /></td>
    </tr>
 </table>
</form>




<?php } ?>