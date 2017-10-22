<?php
	
	require_once "config/connect.php";
	
	$data = json_decode(file_get_contents("php://input"));

	date_default_timezone_set (date_default_timezone_get());
	$user_id 		= $data->user_id;
	$question 		= $data->question;
	$date			= date('Y-m-d H:i:s');


	$insert = "INSERT INTO `questions`(`question_id`, `user_id`, `question`, `date_posted`, `deleted`) VALUES (NULL, '$user_id', '$question','$date', 0 )";

	if($conn->query($insert)){
		$last_id=$conn->insert_id;

	    $question = array(
	    	'question_id'	=> $last_id,
	    	'user_id' 		=> $user_id,
	    	'question' 		=> $question
	    );
	    print_r(json_encode($question));
	} 

	else{
		echo json_encode(array(
			"status" => "fail",
			"Error"=> $insert . "<br>" . $conn->error )
		);
	}

	$conn->close();
?>