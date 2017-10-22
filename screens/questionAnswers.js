import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {ipAddress} from './../config/ipAddress';

export class QuestionAnswers extends Component{
	static navigationOptions = ({ navigation }) => ({
		title: 'Question & Answers',
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
		drawerIcon: <Icon name='all-inclusive' />,
	});



	render(){
		const { state } = this.props.navigation;

		return(
			<View style= { styles.container }>

				<View style={styles.questionTitle}>
					<Text style={styles.questionTitleText}>{state.params.data.question.question}</Text>
					<Text style={styles.questionTitleDateText}>Posted on {state.params.data.question.date_posted + " | " + state.params.data.question.noOfAnswers} Answers(s)</Text>
				</View>
				
				<FlatList
					data={state.params.data.answers}
					keyExtractor={(item, index) => index}
					renderItem={({item}) => 
						<TouchableOpacity>
							<View style={styles.item}>
								<View style={styles.user}>
									<View><Icon name='person' color='#639eff' size={38}/></View>
									<View>
										<Text style={styles.userTexts}>{item.ans_fname + " " + item.ans_lname}</Text>
										<Text style={styles.itemDate}>Answered on {item.date_answered }</Text>											          		
									</View>    		
						    	</View>

								<Text style={styles.itemTitle}>{item.answer}</Text>	

								<View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
									<TouchableOpacity style={{flexDirection: 'row'}}>
										<Icon name='insert-comment' color='lightgrey' size={18} containerStyle={{paddingLeft: 10, paddingRight: 5}}/>
										<Text style={{color: '#4f4f4f'}}>Comment</Text>
									</TouchableOpacity>
									<TouchableOpacity style={{flexDirection: 'row'}}>
										<Icon name='star' color='lightgrey' size={18} containerStyle={{paddingLeft: 10, paddingRight: 5}}/>
										<Text style={{color: '#4f4f4f'}}>Like Answer</Text>
									</TouchableOpacity>
								</View>		  										          		
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
	questionTitle:{
		backgroundColor: 'mintcream',
		paddingTop: 10,
		paddingBottom: 7,
		paddingLeft: 50,
		paddingRight: 50,
	},
	questionTitleText:{
		fontSize: 25,
		fontWeight: 'bold',
	},
	questionTitleDateText:{
		fontSize: 12,
		color: 'slategray',
		paddingTop: 5,
	},
	item:{
		backgroundColor: 'mintcream',
		// marginBottom: 4,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderBottomColor: 'lightgrey',
		borderBottomWidth: 1,
	},
	itemTitle:{
		fontSize: 16,
	},
	user:{
		flexDirection: 'row',
		paddingTop: 5,
		paddingBottom: 15,
	},
	userTexts:{
		fontSize: 15,
		fontWeight: 'bold',
		paddingTop: 4,
		paddingLeft: 15,
	},
	itemDate:{
		fontSize: 12,
		color: 'slategray',
		paddingTop: 5,
		paddingLeft: 15,
	},	
});