import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export class ViewPrognosis extends Component{
	static navigationOptions = ({ navigation }) => ({
		title: 'Results',
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

	__done(){

	}
	render(){
		return(
			<View style= { styles.container }>
				<View style={styles.innerCont}>
					<Image 
						source={require('./../images/yellow.jpg')} 
						
					/>

					<Text style = {styles.text} >
						Improve him believe opinion offered met and end cheered forbade. 
						Friendly as stronger speedily by recurred. 
						Son interest wandered sir addition end say. 
						Manners beloved affixed picture men ask. 
						Explain few led parties attacks picture company. 
						On sure fine kept walk am in it. 
						Resolved to in believed desirous unpacked weddings together. 
						Nor off for enjoyed cousins herself. 
						Little our played lively she adieus far sussex. 
						Do theirs others merely at temper it nearer.
					</Text>

					<Button
						onPress = { this.__done }
						title = 'Done'
						color="#6ABFA0"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: 'mintcream',
	},
	innerCont:{
		marginTop: 25,
	},
	text: {
		marginTop: 15,
		marginBottom: 15,
	}
});