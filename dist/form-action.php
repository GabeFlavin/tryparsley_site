<?php
$recipient_email    = "sales@truecutlaser.com"; //recepient
// $recipient_email    = "admin@truecutlaser.com"; //recepient
$from_email         = "sales@truecutlaser.com"; //from email using site domain.

function fixMSQuotes($text) {
	$text = str_replace(chr(130), ',', $text);    // baseline single quote
	$text = str_replace(chr(132), '"', $text);    // baseline double quote
	$text = str_replace(chr(133), '...', $text);  // ellipsis
	$text = str_replace(chr(145), "'", $text);    // left single quote
	$text = str_replace(chr(146), "'", $text);    // right single quote
	$text = str_replace(chr(147), '"', $text);    // left double quote
	$text = str_replace(chr(148), '"', $text);    // right double quote
	$text = mb_convert_encoding($text, 'HTML-ENTITIES', 'UTF-8');
    return $text; 
}

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
	die('Sorry Request must be Ajax POST'); //exit script
}

if($_POST){
    
    $sender_first_name 	= filter_var($_POST["first_name"], FILTER_SANITIZE_STRING); //capture sender name
    // $sender_last_name 	= filter_var($_POST["last_name"], FILTER_SANITIZE_STRING); //capture sender name
    $sender_title 	= filter_var($_POST["title"], FILTER_SANITIZE_STRING); //capture sender email
    $sender_company	= filter_var($_POST["company"], FILTER_SANITIZE_STRING); //capture sender email
    $sender_email 	= filter_var($_POST["email"], FILTER_SANITIZE_STRING); //capture sender email
    $phone_number   = filter_var($_POST["phone"], FILTER_SANITIZE_NUMBER_INT);
    $message 		= filter_var($_POST["message"], FILTER_SANITIZE_STRING); //capture message
	$subject = 'New quote request from ' . $sender_first_name . ' ' . $sender_last_name;
    $attachments = $_FILES['file_attach'];

	$message = fixMSQuotes($message);

	$formattedbody = '<strong>Name:</strong> ' . $sender_first_name . ' ' . $sender_last_name . '<br/><strong>Title:</strong> ' . $sender_title . '<br/><strong>Company:</strong> ' . $sender_company . '<br/><strong>Phone Number:</strong> ' . $phone_number . '<br/><strong>Email Address:</strong> ' . $sender_email . '<br /><strong>Message:</strong> ' . $message;
    
	
    //php validation
    if(strlen($sender_first_name)<2){ // If length is less than 4 it will output JSON error.
        print json_encode(array('type'=>'error', 'text' => 'First name is too short or empty!'));
        exit;
    }
    /*if(strlen($sender_last_name)<2){ // If length is less than 4 it will output JSON error.
        print json_encode(array('type'=>'error', 'text' => 'Last name is too short or empty!'));
        exit;
    }*/
    if(!filter_var($sender_email, FILTER_VALIDATE_EMAIL)){ //email validation
        print json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        exit;
    }
    if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
        print json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
        exit;
    }
    
    $file_count = count($attachments['name']); //count total files attached
    $boundary = md5("sanwebe.com"); 
            
    if($file_count > 0){ //if attachment exists

        //header
        $headers = "MIME-Version: 1.0\r\n"; 
		$headers .= "From: ".$sender_first_name . " <".$from_email.">\r\n"; 
		//$headers .= "From: ".$sender_first_name . " " . $sender_last_name." <".$from_email.">\r\n"; 
        $headers .= "Reply-To: ".$sender_email."" . "\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n"; 
        
        //message text
        // $body = "--$boundary\r\n";
		$body = "--".$boundary."\r\n";
        $body .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n"; 
        $body .= chunk_split(base64_encode($formattedbody)); 
        // $body .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        // $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        // $body .= $formattedbody."\r\n\r\n";

        //attachments
        for ($x = 0; $x < $file_count; $x++){       
            if(!empty($attachments['name'][$x])){
                
                if($attachments['error'][$x]>0) //exit script and output error if we encounter any
                {
                    $mymsg = array( 
                    1=>"The uploaded file exceeds the upload_max_filesize directive in php.ini", 
                    2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form", 
                    3=>"The uploaded file was only partially uploaded", 
                    4=>"No file was uploaded", 
                    6=>"Missing a temporary folder" ); 
                    print  json_encode( array('type'=>'error',$mymsg[$attachments['error'][$x]]) ); 
					exit;
                }
                
                //get file info
                $file_name = $attachments['name'][$x];
                $file_size = $attachments['size'][$x];
                $file_type = $attachments['type'][$x];
                
                //read file 
                $handle = fopen($attachments['tmp_name'][$x], "r");
                $content = fread($handle, $file_size);
                fclose($handle);
                $encoded_content = chunk_split(base64_encode($content)); //split into smaller chunks (RFC 2045)
                
                $body .= "--$boundary\r\n";
                $body .="Content-Type: $file_type; name=".$file_name."\r\n";
                $body .="Content-Disposition: attachment; filename=".$file_name."\r\n";
                $body .="Content-Transfer-Encoding: base64\r\n";
                $body .="X-Attachment-Id: ".rand(1000,99999)."\r\n\r\n"; 
                $body .= $encoded_content; 
            }
        }
		
    }else{ //send plain email otherwise
       $headers = "From:".$sender_first_name . " " . $sender_last_name." <".$from_email.">\r\n".
        "Reply-To: ".$sender_email. "\n" .
        "X-Mailer: PHP/" . phpversion();
        $body = $formattedbody;
    }
        
    $sentMail = mail($recipient_email, $subject, $body, $headers);
    if($sentMail) //output success or failure messages
    {       
        print json_encode(array('type'=>'done', 'text' => 'Your request for a quote was sent, a True Cut Laser representative will be in touch soon. Thank You!'));
		exit;
    }else{
        print json_encode(array('type'=>'error', 'text' => 'Sorry, theres an error the quote cannot be sent. Please contact us.'));  
		exit;
    }
}
?>