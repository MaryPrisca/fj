import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {ipAddress} from './../config/ipAddress';

export class MyQuestions extends Component{
	constructor (props) {
		super(props)
		this.state = {		
			myquestions: [],
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'My Questions',
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
		headerRight: <Icon name='more-vert' color='#fff'/>,	
		drawerIcon: <Icon name='home' />,
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

		const response = await fetch('http://' + ipAddress + '/AwesomeProject/AgricExtension/php/getMyQuestions.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({user_id: state.params.user.user_id})//state.params.user.user_id
		});

		const json = await response.json();

		this.setState({myquestions: json});
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
					data={this.state.myquestions}
					keyExtractor={(item, index) => index}
					renderItem={({item}) => 
						<TouchableOpacity onPress={() => this.getQuestion(item.question_id)}>
							<View style={styles.item}>	         	
								<Text style={styles.itemTitle}>{item.question}</Text>			          		
								<Text style={styles.itemDate}>{item.date_posted} | {item.noOfAnswers} Answer(s)</Text>			          		
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
	item:{
		backgroundColor: 'mintcream',
		marginBottom: 1,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
	},
	itemTitle:{
		fontSize: 23,
		fontWeight: 'bold'
	},
	itemDate:{
		fontSize: 12,
		color: 'slategray',
	}

});