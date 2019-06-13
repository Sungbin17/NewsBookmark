import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import GoBackButton from "../components/GoBackButton";
import Styles from "../constants/Styles";

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerLeft: (<GoBackButton navigateScreen={'Main'}/>)
    };

    _handleLogout = () => {
        this.props.navigation.navigate('Auth');
        AsyncStorage.setItem("userToken", '')
    };

    render() {
        return (
            <View style={{...Styles.container, paddingLeft: 15, paddingRight: 15}}>
                <TouchableOpacity onPress={this._handleLogout}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


