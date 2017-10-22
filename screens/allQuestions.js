import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import {ipAddress} from './../config/ipAddress';

export class AllQuestions extends Component{
	constructor (props) {
		super(props)
		this.state = {		
			allquestions: [],
		};
	}
	search(){

	}


	static navigationOptions = ({ navigation }) => ({
		title: 'Other Questions',
		headerTitleStyle: {
			color: "#fff"
		},
		headerStyle: {
			backgroundColor: "seagreen",//#6ABFA0 
			marginTop: 25,  
			paddingLeft: 10,
			paddingRight: 10,
			flexDirection: 'row',
			justifyContent: 'center',
		},
		headerTintColor: {
			/* this will color your back and forward arrows or left and right icons */
		},	
		headerLeft: <Icon name='menu' color='#fff' onPress={()=> navigation.navigate('DrawerOpen')}/>,	
		headerRight: <Icon name='search' color='#fff'/>,	
		// headerRight: <SearchBar  onChangeText={this.search} placeholder='Type Here...' />,
		drawerIcon: <Icon name='all-inclusive' />,
	});

	componentWillMount(){
		const { state } = this.props.navigation;
		const { navigate } = this.props.navigation;

		if(state.params !== undefined){
			this.getAllQuestions();
		}
		else{
			navigate('Login');
		}
		
	}

	getAllQuestions = async () => {		
		const { state } = this.props.navigation;

		const response = await fetch('http://' + ipAddress + '/AwesomeProject/AgricExtension/php/getAllQuestions.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({user_id: state.params.user.user_id})//state.params.user.user_id
		});

		const json = await response.json();
		// console.log(json);

		this.setState({allquestions: json});
	}

	getQuestion = async (qid) => {
		const { navigate } = this.props.navigation;

		const response = await fetch('http://' + ipAddress + '/AwesomeProject/AgricExtension/php/getQuestion.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({question_id: qid})
		});

		const json = await response.json();

		console.log(json);

		navigate('QuestionAnswers', { data: json });
	}

	render(){
		return(
			<View style= { styles.container }>
				<FlatList
					data={this.state.allquestions}
					keyExtractor={(item, index) => index}
					renderItem={({item}) => 
						<TouchableOpacity onPress={() => this.getQuestion(item.question_id)}>
							<View style={styles.questionItem}>	         	
								<Text style={styles.questionItemTitle}>{item.question}</Text>			          		
								<Text style={styles.itemDate}>{item.date_posted} | {item.noOfAnswers} Answer(s)</Text>	

								<FlatList
									data={item.answers}
									keyExtractor={(item, index) => index}
									renderItem={({item}) => 
										<TouchableOpacity>
											<View style={styles.answerItem}>

												<View style={styles.user}>
													<View>
														<Text style={styles.userTexts}>{item.ans_fname !== undefined ? item.ans_fname + " " + item.ans_lname : " "}</Text>
										          		
														<Text style={styles.itemDate}>{item.date_answered !== undefined ? "Answered on " + item.date_answered : " "}</Text>											          		
													</View>    		
										    	</View>
  										          		
												<Text style={styles.answerItemTitle}>{item.answer !== undefined ? item.answer : " "}</Text>			  										          		
											</View>
										</TouchableOpacity>
									}
								/>

							</View>
						</TouchableOpacity>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		// paddingLeft: 20,
		// paddingRight: 20,
		backgroundColor: 'lightgrey',
	},
	innerCont:{
		marginTop: 25,
	},
	text: {
		marginTop: 15,
		marginBottom: 15,
	},	
	questionItem:{
		backgroundColor: 'mintcream',
		marginBottom: 1,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 25,
		paddingRight: 25,
	},
	questionItemTitle:{
		fontSize: 20,
		fontWeight: 'bold'
	},
	itemDate:{
		fontSize: 12,
		color: 'slategray',
	},


	answerItem:{
		backgroundColor: 'mintcream',
		// marginBottom: 4,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		// borderColor: 'lightgrey',
		// borderWidth: 1,
	},
	answerItemTitle:{
		fontSize: 16,
	},
});