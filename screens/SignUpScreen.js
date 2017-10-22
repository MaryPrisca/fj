import React from 'react';
import {
	Text, StyleSheet, View, TextInput, Button, Alert, ScrollView, Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Form, TextValidator } from 'react-native-validator-form';
import SimpleButton from './../components/SimpleButton';
import {ipAddress} from './../config/ipAddress';

export class SignUpScreen extends React.Component {
	constructor (props) {
		super(props)
		this.state = {		
				fname: 		 	"",
				lname:		 	"",
				phone: 		 	"",
				email: 		 	"",
				password:	 	"",
				conf_password: 	""
		};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Sign Up',	
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
		drawerLabel: 'Sign Up',
		drawerIcon: <Icon name='home' />,
	});


	componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        Form.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
 
    handleSubmit() { 
        Alert.alert('You clicked Submit');
        this.refs.form.submit();	//calls the submit function given in the form's onSubmit
    }

	createAccount(){//navigate
		// console.log(this.state.user);
		const { navigate } = this.props.navigation;
		
		const user = {
			fname: 		 	this.state.fname,
			lname:		 	this.state.lname,
			phone: 		 	this.state.phone,
			email: 		 	this.state.email,
			password:	 	this.state.password,
			conf_password: 	this.state.conf_password,
		}

		fetch('http://' + ipAddress + '/AwesomeProject/AgricExtension/php/saveUser.php', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user)
		})
		.then(function(response){ 
			return response.json();   
		})
		.then(function(data){ 
			console.log(data)
		});

		// Alert.alert('Creating Acc');

		navigate('Login', { user: user });

		// console.log(user);

	}

	render() {
		const { navigate } = this.props.navigation;
        const { user } = this.state;


		return (
			<View  style={styles.container}>
				<View style={styles.topContainer}>
					<Image style={styles.logoImage}
						source={require('./../assets/images/logo40x45.png')} 						
					/>
					<Text style={styles.logoTitle}>Farmers Joint</Text>
				</View>
		    	<View style = { styles.bottomContainer }>		    	
					<Form style = {styles.form}
		                ref="form"
		                onSubmit={this.createAccount}
		                instantValidate={true}
		            >

			            <TextValidator
		                	name="fname"
		                    type="text"
		                    placeholder="Firstname"
		                    value={this.state.fname}
		                    validators={['required', 'matchRegexp:^[a-zA-Z]+$']}
		                    errorMessages={['This field is required', 'Letters Only']}
		                    errorStyle = {errorStyles}
							onChangeText={(fname) => {this.setState({fname})}}
							// onChangeText={(email) => {
							// 	this.setState({
							// 		user:{...this.state.user, email: {email}}
							// 	})
							// }}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />


		                <TextValidator
		                	name="lname"
		                    type="text"
		                    placeholder="Lastname"
		                    value={this.state.lname}
		                    validators={['required']}
		                    errorMessages={['This field is required']}
		                    errorStyle = {errorStyles}
							onChangeText={(lname) => {this.setState({lname})}}						
							// onChangeText={(lname) => {
							// 	this.setState({
							// 		user:{...this.state.user, lname: {lname}}
							// 	})
							// }}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />

			            <TextValidator
		                	name="phone"
		                    type="text"
		                    placeholder="Phone Number"
		                    value={this.state.phone}
		                    validators={['required', 'isNumber']}
		                    errorMessages={['This field is required', 'Phone Number invalid']}
		                    errorStyle = {errorStyles}
		                    keyboardType="numeric"
							onChangeText={(phone) => {this.setState({phone})}}						
							// onChangeText={(phone) => {
							// 	this.setState({
							// 		user:{...this.state.user, phone: {phone}}
							// 	})
							// }}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />


		                <TextValidator
		                	name="email"
		                    type="text"
		                    placeholder="Email Address"
		                    value={this.state.email}
		                    validators={['required', 'isEmail']}
		                    errorMessages={['This field is required', 'Email invalid']}
		                    errorStyle = {errorStyles}
		                    keyboardType="email-address"
							onChangeText={(email) => {this.setState({email})}}						
							// onChangeText={(email) => {
							// 	this.setState({
							// 		user:{...this.state.user, email: {email}}
							// 	})
							// }}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />

			            <TextValidator
		                	name="password"
		                    type="text"
		                    placeholder="Password"
		                    value={this.state.password}
		                    validators={['required']}
		                    errorMessages={['This field is required']}
		                    errorStyle = {errorStyles}
		                    secureTextEntry = {true}
							onChangeText={(password) => {this.setState({password})}}					
							// onChangeText={(password) => {
							// 	this.setState({
							// 		user:{...this.state.user, password: {password}}
							// 	})
							// }}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />


		                <TextValidator
		                	name="conf_password"
		                    type="password"
		                    placeholder="Confirm Password"
		                    value={this.state.conf_password}
		                    validators={['required', 'isPasswordMatch']}
		                    errorMessages={['This field is required', 'Passsword mismatch']}
		                    errorStyle = {errorStyles}
		                    secureTextEntry = {true}
							onChangeText={(conf_password) => {this.setState({conf_password})}}				
							// onChangeText={(conf_password) => {
							// 	this.setState({
							// 		user:{...this.state.user, conf_password: {conf_password}}
							// 	})
							// }}
							style={styles.textInputs}
							underlineColorAndroid = "transparent"						

		                />


		                <SimpleButton onPress={this.handleSubmit} customText="Sign Up" buttonStyle={CreateAccButtonStyle} />

				        <SimpleButton onPress={() => navigate('Login')} customText="Log in" buttonStyle={loginButtonStyle} />

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
		// backgroundColor: '#86ce8e',
		backgroundColor: '#6ABFA0',
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
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 5,
	},
	bottomContainer:{
		flex: 3,
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
		fontSize: 17,
		// marginBottom: 10,
	},	
});

const CreateAccButtonStyle = {
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
	 	fontSize: 17,
	 },
};


const loginButtonStyle = {
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
		paddingTop: 3,
	}, 
	text: { 
		color: 'red' 
	}, 
	underlineValidColor: 'gray', 
	underlineInvalidColor: 'red' 
};