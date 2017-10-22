<?php

	require_once "config/connect.php";

	// $data = json_encode(array(
	// 	'email' => 'marypriscan@gmail.com',
	// 	'password' => '2t'
	// ));

	// var_dump($data);
	// // var_dump(json_decode($data));
	// $data = json_decode($data);

	$data = json_decode(file_get_contents("php://input"));

	$email  	= $data->email;
	$password  	= $data->password;

	$sql = "SELECT * FROM users WHERE email = _utf8 '".$email."' COLLATE utf8_bin and password = _utf8 '".$password."' COLLATE utf8_bin";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$data = array();

		while ($row = $result->fetch_assoc()) {

			$user = array(
		    	'user_id'		=> $row['user_id'],
		    	'firstname' 	=> $row['firstname'],
		    	'lastname' 		=> $row['lastname'],
		    	'email' 		=> $row['email'],
		    	'password' 		=> $row['password'],
		    	'phone' 		=> $row['phone'],
		    	'user_role' 	=> $row['user_role']
		    );

		}
		 print json_encode($user);
	} 
	else{
		echo json_encode(array(
				"status" => "fail",
				"Error"=> $sql . "<br>" . $conn->error )
		);
	}

	$conn->close();

?>