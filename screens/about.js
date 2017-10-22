import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export class About extends React.Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'About Us',
		// header: null,	
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
		// headerRight: <Icon name='more-vert' color='#fff'/>,	
		drawerIcon: <Icon name='all-inclusive' />,
	});
 
    
	render() {
		return(
			<View style={styles.container}>
				<Image style={styles.logoImage}
					source={require('./../assets/images/logo70x78.png')} 						
				/>

				<Text style={styles.title}>Farmers Joint</Text>
				<Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>

				<Text style={styles.text}>Ut enim ad minima veniam!</Text>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'mintcream',
		paddingLeft: 30, 
		paddingRight: 30,
		// opacity: 0.7,
	},
	logoImage: {
		marginBottom: 8,
		opacity: 0.7,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#1e1e1e',
		opacity: 0.6,
		textAlign: 'center',
		marginBottom: 25,
	},
	text:{
		fontSize: 20,
		fontWeight: 'bold',
		color: 'lightslategrey',
		opacity: 0.7,
		textAlign: 'center',
		marginBottom: 8,
	},
});