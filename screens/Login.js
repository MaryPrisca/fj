import React from 'react';
import {TextInput, StyleSheet, View, Text, Button, Alert, Image} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, TextValidator } from 'react-native-validator-form';
import SimpleButton from './../components/SimpleButton';
import {ipAddress} from './../config/ipAddress';

export class Login extends React.Component {
	constructor(props) {
        super(props);
 		this.state 			= { 
 			"email": 	"", 
 			"password": "",
 			"loggedIn": true
 		};
        this.handleSubmit 	= this.handleSubmit.bind(this);
        this.login 			= this.login.bind(this);
        var loggedIn = true;
    }


	static navigationOptions = ({ navigation }) => ({
		title: 'Login',
		header: null,	
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
		drawerIcon: <Icon name='all-inclusive' />,
	});
 
    handleSubmit() { 
        // Alert.alert('You clicked Submit');
        this.refs.form.submit();//calls the submit function given in the form's onSubmit
    }


	login(){
		const { navigate } = this.props.navigation; 

		fetch('http://' + ipAddress + '/AwesomeProject/AgricExtension/php/login.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 		this.state.email,
				password: 	this.state.password
			})
		})
		.then(function(response){ 
			return response.json();  
		})
		.then(function(data){ 
			console.log(data)
			if( Object.prototype.toString.call( data ) === '[object Array]' ) {
				// ()=> this.setState({ email: "" });
				loggedIn = false;
				console.log(loggedIn);
			}
			else{
				navigate('myQuestions', { user: data });
			}
		});
	}

    
	render() {
		const { navigate } = this.props.navigation;
		const { state } = this.props.navigation;

		return(
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Image style={styles.logoImage}
						source={require('./../assets/images/logo70x78.png')} 						
					/>
					<Text style={styles.logoTitle}>Farmers Joint</Text>
				</View>


				<View style={styles.bottomContainer}>
					<Form style = {styles.form}
		                ref="form"
		                onSubmit={this.login}
		                instantValidate={true}
		            >
		                <TextValidator
		                	name="email"
		                    type="text"
		                    placeholder="Enter Email Address"
		                    // value="marypriscan@gmail.com"
		                    // value={this.state.email}
		                    value={state.params !== undefined ? state.params.user.email : this.state.email}
		                    validators={['required', 'isEmail']}
		                    errorMessages={['This field is required', 'Email invalid']}
		                    errorStyle = {errorStyles}
		                    keyboardType="email-address"
		                    // onChange={this.handleChange}
							onChangeText={(email) => {this.setState({email})}}
							style={styles.textInputs}
							// style={[styles.textInputs, (loggedIn === false ? styles.textInputsHighlight : null)]}
							underlineColorAndroid = "transparent"						

		                />


		                <TextValidator
		                	name="password"
		                    type="password"
		                    placeholder="Enter Password"
		                    // value="maryp"
		                    value={this.state.password}
		                    // value={state.params !== undefined ? state.params.user.password : this.state.password}
		                    validators={['required']}
		                    errorMessages={['This field is required']}
		                    errorStyle = {errorStyles}
		                    secureTextEntry = {true}
		                    // onChange={this.handleChange}
							onChangeText={(password) => {this.setState({password})}}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />

		                <SimpleButton onPress={this.handleSubmit} customText="Login" buttonStyle={loginButtonStyle} />
						
						<SimpleButton onPress={() => navigate('SignUp')} customText="Don't have an account?" buttonStyle={signUpButtonStyles} />

			    		
		            </Form>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		// backgroundColor: '#86ce8e',
		backgroundColor: '#6ABFA0',
		// opacity: 0.7,
	},
	topContainer:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

	},
	logoImage:{
		// height: 80,
		// width: 80,
	},
	logoTitle:{
		color: 'white',
		fontSize: 28,
		fontWeight: 'bold',
		marginTop: 15,
	},
	bottomContainer:{
		flex: 1,
	},	
	form:{
		paddingLeft: 35,
		paddingRight: 35,
	},
	textInputs: {	
		backgroundColor: '#fff',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 15,
		paddingLeft: 10,
		fontSize: 19,
		// marginBottom: 10,
	},	

});

const loginButtonStyle = {
	container:{
		// backgroundColor: '#437749',
	 // 	borderColor: '#437749',
		backgroundColor: '#4e8c75',
	 	borderColor: '#4e8c75',
		borderWidth: 1,
		borderRadius: 15,
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		opacity: 0.8,
		marginBottom: 10,
	 },
	 text:{
	 	color: '#FFF',
	 	fontSize: 19,
	 },
};


const signUpButtonStyles = {
	 container:{
	 	flexDirection: 'row',
	 	justifyContent: 'flex-end',
	 	// borderColor: '#000',
	 	// borderWidth: 1,
	 },
	 text:{
	 	color: 'white',
	 	fontSize: 18,
	 },
};

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

