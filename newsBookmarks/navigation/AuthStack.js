import React from 'react';
import {createStackNavigator} from 'react-navigation';

import AuthScreen from '../screens/Auth/AuthScreen';
import SignupEmailScreen from '../screens/Auth/SignupEmailScreen'
import SignInEmailScreen from '../screens/Auth/SignInEmailScreen'


const AuthStack = createStackNavigator({
    Auth: AuthScreen,
    SignupEmail: SignupEmailScreen,
    SignInEmail: SignInEmailScreen
});

export default AuthStack;
