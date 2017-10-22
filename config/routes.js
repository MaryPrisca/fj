import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

//screens
import { Login } from './../screens/Login';
import { SignUpScreen } from './../screens/SignUpScreen';
import { AskQuestion } from './../screens/askQuestion';
// import { ViewPrognosis } from './../screens/viewPrognosis';
import { CustomDrawerComponent } from './../components/customDrawer';
import { MyQuestions } from './../screens/myQuestions';
import { QuestionAnswers } from './../screens/questionAnswers';
import { AllQuestions } from './../screens/allQuestions';



const tabs = TabNavigator({
		AllQuestions: { 
			screen: AllQuestions, 
			navigationOptions: {
				tabBarIcon: <Icon name='list' color='#000'/>
			},
		},
		MyQuestions: {
			screen: MyQuestions,
			navigationOptions: {
				tabBarIcon: <Icon name='event-note' color='#000'/>
			},
		},
		askQuestion: 	{
			screen: AskQuestion,			
			navigationOptions: {
				tabBarIcon: <Icon name='mode-edit' color='#000'/>
			},
		},
	}, 
	{
		tabBarPosition: 'bottom',
		animationEnabled: true,
		tabBarOptions: {
			showIcon: true,
			activeTintColor: '#e91e63',
			style: {
				backgroundColor: 'mintcream',
			},
			labelStyle: {
				fontSize: 12,
				color: '#1e1e1e'
			},
			upperCaseLabel: false,
		},
	}
);


export const SimpleApp = StackNavigator({
	// Home: 		{screen: MyAppDrawer},
	Login: 		 	{ screen: Login },
  	SignUp: 		{ screen: SignUpScreen },
	askQuestion: 	{ screen: AskQuestion },
	// Prognosis: 	 	{ screen: ViewPrognosis },
	myQuestions: 	 { screen: tabs },
	QuestionAnswers: 	 { screen: QuestionAnswers },
});

export const MyAppDrawer = DrawerNavigator(
	{
		Home: 			{ screen: SimpleApp },
		// Login: 			{ screen: Login },
		// SignUp: 		{ screen: SignUpScreen },
		// askQuestion: 	{ screen: AskQuestion },
		// Prognosis: 		{ screen: ViewPrognosis },
		// myQuestions: 	{ screen: MyQuestions },
	},
	{
		drawerPosition: 'left',
		contentComponent: CustomDrawerComponent,
		contentOptions: {
			style: {
				marginVertical: 0,
			}
		}
	}
);