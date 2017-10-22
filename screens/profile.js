import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

export class Profile extends React.Component {	
	constructor(props) {
        super(props)
    }


	static navigationOptions = ({ navigation }) => ({
		title: 'My Profile',
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
				<View style={styles.topContainer}>
					<View style={{flexDirection: 'row', justifyContent: 'center'}}>
						<Avatar
							large
							rounded
							icon={{name: 'person'}}
							onPress={() => console.log("Works!")}
							activeOpacity={0.7}
							containerStyle={{marginBottom: 10, marginTop: 15}}
						/>
						
					</View>
					

					<Text style={styles.name}>Firstname Lastname</Text>

				</View>
				<View style={styles.bottomContainer}>

					<View style={styles.fields}>
						<Icon name='email' containerStyle={{paddingRight: 24}} color='lightslategrey'/>
						<Text style={styles.fieldTexts}>Email Address</Text>
					</View>

					<View style={styles.fields}>
						<Icon name='phone' containerStyle={{paddingRight: 24}} color='lightslategrey'/>
						<Text style={styles.fieldTexts}>Phone Number</Text>
					</View>

				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		// justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: 'mintcream',
		// opacity: 0.7,
	},
	topContainer: {
		flex: 2,
		backgroundColor: '#6ABFA0',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10,
	},
	name:{
		fontSize: 25,
		color: '#fff',
		fontWeight: 'bold',
	},
	bottomContainer: {		
		flex: 3,
		alignItems: 'stretch',
		paddingTop: 16,
	},
	fields: {
		flexDirection: 'row',
		height: 48,
		marginBottom: 16,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 25,
		marginRight: 25,
		borderWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 3,
	},
	fieldTexts: {
		fontSize: 20,
		// fontWeight: 'bold',
		color: '#1e1e1e',
	}
});