import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

export default class DrawerButton extends Component {	

	render () {
		return (
			<TouchableHighlight onPress={this.props.onPress} underlayColor="#efefef" activeOpacity={0.1}>
				<View style={styles.container}>
					<View style={styles.iconView}><Icon name={this.props.iconName} color='#1e1e1e' containerStyle={styles.iconContainer}/></View>
					<Text style={styles.text}>{this.props.customText || 'Simple Button'}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container:{
	 	height: 48,
	 	flexDirection: 'row',
	 	justifyContent: 'flex-start',
	 	alignItems: 'center',
	 	paddingTop: 10,
	 	paddingBottom: 12,
	 },
	 iconView:{
	 	width: 72, 
	 },
	 iconContainer:{
	 	// borderColor: 'redcc
	 	flexDirection: 'row',
	 	justifyContent: 'flex-start',
	 	paddingLeft: 16,
	 },
	 text:{
	 	color: '#1e1e1e',
	 	fontSize: 15,
	 	fontWeight:'bold',
	 },
});