<?php	 
require_once "config/connect.php";

$data = json_decode(file_get_contents("php://input"));

$user_id 	= 1;
// $user_id 	= $data->user_id;

// $select = "SELECT `question_id`, `user_id`, `question`, `date_posted` 
// FROM `questions` 
// JOIN answers a
// 		ON q.question_id = a.question_id
// WHERE user_id='$user_id' 
// AND deleted='0'";

$select = "SELECT q.question_id, `user_id`, `question`, `date_posted`, count(answer_id) AS noOfAnswers
FROM `questions` q
LEFT JOIN answers a
		ON q.question_id = a.question_id
WHERE user_id NOT IN ('$user_id')
AND q.deleted='0'
GROUP BY q.question_id";


$result = $conn->query($select);

if ($result->num_rows > 0) {
	$data = array();

	while ($row = $result->fetch_assoc()) {
		$date = new DateTime($row['date_posted']);	
		$row['date_posted'] = $date->format('M jS, Y');		


		$selectAnswers = "SELECT q.question_id, answer_id, ans_user_id, u.firstname as ans_fname, u.lastname AS ans_lname, answer, date_answered 
			FROM questions q
			JOIN answers a
				ON q.question_id = a.question_id
		    JOIN users u
		    	ON a.ans_user_id = u.user_id         
		   	WHERE q.question_id = " . $row['question_id'];

		$answersResult = $conn->query($selectAnswers);
		if ($answersResult->num_rows > 0) {
			$answers = array();

			while ($answersRow = $answersResult->fetch_assoc()) {
				$date = new DateTime($answersRow['date_answered']);	
				$answersRow['date_answered'] = $date->format('M jS, Y');

				$answers[] = $answersRow;
			}

			$row['answers'] = $answers;
		} 
		else{
			$row['answers'] = NULL;
		}

		$data[] = $row;
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