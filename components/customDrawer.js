import React, {Component} from 'react'
import {View,Text, TouchableOpacity, TouchableHighlight, ScrollView, Alert, Share, Image} from 'react-native'
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import DrawerButton from './drawerButton';
import { Divider } from 'react-native-elements';


export class CustomDrawerComponent extends Component {
	constructor(props) {
		super(props)		
        this.logout 	= this.logout.bind(this);
	}

	_showResult (result) {
		console.log(result)
	}

	shareApp(){
		Share.share({
			message: 'Check out Farmers Joint mobile application @ http://someUrl.com',
			title: 'Farmers Joint',
			url: 'http://codingmiles.com'
		}, 
		{
			dialogTitle: 'Share Link',
			excludedActivityTypes: [
				'com.apple.UIKit.activity.PostToTwitter',
				'com.apple.uikit.activity.mail'
			],
			tintColor: 'green'
		})
		.then(this._showResult)
		.catch(err => console.log(err))
	}

	logout() { 
		const { navigate } = this.props.navigation; 
		const { state } = this.props.navigation; 

		// state.params.user = {};

		navigate('Login');
    }

	render(){		
		const { navigate } = this.props.navigation; 

		return(
			<View style={{elevation: 16}}>
				<View style={{height:178, backgroundColor:'#6ABFA0', marginBottom: 16,  paddingLeft: 16, paddingTop: 24, flexDirection: 'column', justifyContent: 'flex-end'}}>
					<Image
						source={require('./../assets/images/logo60x65.png')} 						
					/>
					<View style={{height: 56, justifyContent: 'center'}}>
						<Text style={{fontSize:18, color:'#fff', fontWeight: 'bold'}}>Farmers Joint</Text>
						<Text style={{fontSize:16, color:'#fff'}}>info@farmersjoint.co.ke</Text>						
					</View>
					
				</View>

				<ScrollView>

					<DrawerButton onPress={() => navigate('myQuestions')} customText="Home" iconName="home" />
					<DrawerButton onPress={() => navigate('postRequest')} customText="Ask a Question"  iconName="mode-edit" />
					<DrawerButton onPress={this.logout} customText="Logout" iconName="open-in-new" />

					<View style={{height: 8}}></View>
					<Divider style={{ backgroundColor: '#f4f4f4' }} />

					<DrawerButton onPress={this.shareApp} customText="Share" iconName="share" />
					<DrawerButton onPress={this.shareApp} customText="About" iconName="info" />

				</ScrollView>
			</View>
		)
	}
}