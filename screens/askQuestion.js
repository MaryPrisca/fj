import React from 'react';
import {
	Text, StyleSheet, View, TextInput, Button, Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, TextValidator } from 'react-native-validator-form';
import {ipAddress} from './../config/ipAddress';

// import Camera from 'react-native-camera';

export class AskQuestion extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			imagesSelected: [], 
			question: "",
		}

		this.getSelectedImages 	= this.getSelectedImages.bind(this);
        this.handleSubmit 		= this.handleSubmit.bind(this);
        this.postQuestion 		= this.postQuestion.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Ask a Question',
		headerTitleStyle: {
			/* this only styles the title/text (font, color etc.)  */
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
		drawerIcon: <Icon name='rate-review' />,
	});

	componentWillMount(){
		const { state } = this.props.navigation;
		const { navigate } = this.props.navigation;

		if(state.params === undefined){
			navigate('Login');
		}
	}

	handleSubmit() { 
        this.refs.form.submit();//calls the submit function given in the form's onSubmit
    }

    postQuestion(){
        Alert.alert('You clicked Submit');
    	const { navigate } = this.props.navigation;

		const { state } = this.props.navigation;

		
		const question = {
			user_id: 	state.params !== undefined ? state.params.user.user_id  : 0,
			question:	this.state.question,
		}

		fetch('http://' + ipAddress + '/AwesomeProject/AgricExtension/php/saveQuestion.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(question)
		})
		.then(function(response){ 
			return response.json();   
		})
		.then(function(data){ 
			console.log(data)
		});

    }

	getSelectedImages(){
		console.log(this.state.imagesSelected);
	}

	render() {
		const { navigate } = this.props.navigation;
		const { state } = this.props.navigation;

		return (
		    <View style = { styles.container }>
		    	
		    	<View style={styles.user}>
		    		<Icon name='person' color='#639eff'/>
		    		<Text style={styles.userTexts}>{state.params !== undefined ? state.params.user.firstname + " " + state.params.user.lastname  : "Anonymous"} Asks</Text>		    		
		    	</View>

		    	<View style={styles.form}>
	    			<Form style = { styles.form }
		                ref="form"
		                onSubmit={this.postQuestion}
		                instantValidate={true}
		            >

		                <TextValidator
		                	name="question"
		                    type="text"
		                    placeholder="What is your question?"
		                    value={this.state.question}
		                    validators={['required']}
		                    errorMessages={['This field is required']}
		                    errorStyle = {errorStyles}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"	
							onChangeText={(question) => {this.setState({question})}}
							multiline = {true}
							numberOfLines = {6}
							// autogrow = {true}	
							// maxHeight = {80}
		                />

		                <View style={styles.buttonView}>
		                	<Button
			                    title="Ask"
			                    onPress={this.handleSubmit}
				    			style={ styles.buttons }
								color="red"
			                />
		                </View>
		                
		            </Form>
	    		</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 10,
		backgroundColor: 'mintcream',
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
	// form: {
	// 	height: 190,
	// 	flexDirection: 'column',
	// 	justifyContent: 'space-between',
	// 	// borderColor: '#00e',
	// 	// borderWidth: 1,
	// 	marginTop: 20,
	// 	marginBottom: 50,
	// },
	textInputs:{
		borderBottomColor: '#000',
		borderBottomWidth: 1,
		paddingLeft: 5,
		fontSize: 18,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	buttonView:{
		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingLeft: 160,
	},
	buttons:{
		marginBottom: 30,
		borderColor: '#000',
		borderWidth: 1,
		backgroundColor: "red",
	}
});

const errorStyles = {
	container: { 
		// top: 0, 
		// left: 0, 
		// position: 'absolute' ,
		paddingLeft: 5,
		paddingTop: 5,
	}, 
	text: { 
		color: 'red' 
	}, 
	underlineValidColor: 'gray', 
	underlineInvalidColor: 'red' 
};