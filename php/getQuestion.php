<?php	 
require_once "config/connect.php";

$data = json_decode(file_get_contents("php://input"));

$question_id 	= $data->question_id;
// $question_id 	= 1;

// $select = "SELECT questions.question_id, user_id, question, date_posted, answer_id, ans_user_id, answer, date_answered 
// 	FROM questions 
// 	LEFT JOIN answers 
// 		ON questions.question_id = answers.question_id 
// 	WHERE questions.question_id = '$question_id' 
// ";

$selectQuestion = "SELECT q.question_id, question, date_posted
	FROM questions q      
   	WHERE q.question_id = '$question_id'";

$selectAnswers = "SELECT q.question_id, answer_id, ans_user_id, u.firstname as ans_fname, u.lastname AS ans_lname, answer, date_answered 
	FROM questions q
	JOIN answers a
		ON q.question_id = a.question_id
    JOIN users u
    	ON a.ans_user_id = u.user_id         
   	WHERE q.question_id = '$question_id'";

$questionResult = $conn->query($selectQuestion);

if ($questionResult->num_rows > 0) {
	$data = array();

	while ($row = $questionResult->fetch_assoc()) {
		$date = new DateTime($row['date_posted']);	
		$row['date_posted'] = $date->format('M jS, Y');

		$data['question'] = $row;
	}

	$answersResult = $conn->query($selectAnswers);
	if ($answersResult->num_rows > 0) {
		$answers = array();

		while ($row = $answersResult->fetch_assoc()) {
			$date = new DateTime($row['date_answered']);	
			$row['date_answered'] = $date->format('M jS, Y');

			$answers[] = $row;
		}


		$data['answers'] = $answers;
		$data['question']['noOfAnswers'] = count($data['answers']);
	} 
	else {
		$data['answers'] = NULL;
		$data['question']['noOfAnswers'] = 0;
	}
	print json_encode($data);
} 
else {
 	echo json_encode(array(
			"status" => "fail",
			"Error"=> $select . "<br>" . $conn->error )
	);
}

?>