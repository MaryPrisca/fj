import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';

export default class SimpleButton extends Component {	
	static navigationOptions = {
		title: 'Welcome',
	};
	render () {
		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<View style={this.props.buttonStyle.container}>
					<Text style={this.props.buttonStyle.text}>{this.props.customText || 'Simple Button'}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

// SimpleButton.propTypes = {
// 	onPress: React.PropTypes.func.isRequired,
// 	customText: React.PropTypes.string
// };


// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 60,
//     alignItems: 'center'
//   },
//   button: {
//     marginBottom: 30,
//     width: 260,
//     alignItems: 'center',
//     backgroundColor: '#2196F3'
//   },
//   buttonText: {
//     padding: 20,
//     color: 'white'
//   }
// })