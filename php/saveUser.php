<?php
	
	require_once "config/connect.php";
	
	$data = json_decode(file_get_contents("php://input"));

	// $data = json_decode('{"fname":"fname,","lname":"lname,","email":"email,","password":"pass,","phone":"phone"}');

	// $data = json_encode(array(
	// 	'fname' 		=> "fname,",
 //    	'lname' 		=> "lname,",
 //    	'email' 		=> "email,",
 //    	'password' 		=> "pass,",
 //    	'phone' 		=> "phone"
	// ));

	// var_dump($data);

	$fname 		= $data->fname;
	$lname 		= $data->lname;
	$email 		= $data->email;
	$pass 		= $data->password;
	$phone		= $data->phone;
	$user_role 	= "0";

	

	$insert = "INSERT INTO `users`(`user_id`, `firstname`, `lastname`, `email`, `phone`, `password`, `user_role`) 
							VALUES (null, '$fname', '$lname', '$email', '$phone', '$pass', '$user_role')";

	if($conn->query($insert)){
		$last_id=$conn->insert_id;
	    $users = array(
	    	'id'			=> $last_id,
	    	'fname' 		=> $fname,
	    	'lname' 		=> $lname,
	    	'email' 		=> $email,
	    	'password' 		=> $pass,
	    	'phone' 		=> $phone,
	    	'user_role' 	=> $user_role
	    );
	    print_r(json_encode($users));
	} 

	else{
		echo json_encode(array(
			"status" => "fail",
			"Error"=> $insert . "<br>" . $conn->error )
		);
	}

	$conn->close();
?>