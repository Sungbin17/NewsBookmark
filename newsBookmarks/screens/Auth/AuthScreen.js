import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import GoBackButton from "../../components/GoBackButton";

export default class AuthScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.lightGreen,
            borderBottomWidth: 0,
        },
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex:1}}>
                <View style={Styles.welcomeContainer}>
                    <Text style={{fontSize: 25}}>News Bookmarks</Text>
                    <Text style={{fontSize: 20, marginTop: 20}}>Ideas that set your mind in motion.</Text>
                    <TouchableOpacity style={Styles.button} onPress={() => navigate('SignupEmail')}>
                        <Ionicons style={{marginRight: 15}} name="md-mail" size={20} color="black"/>
                        <Text>
                            Sign up with email
                        </Text>
                    </TouchableOpacity>
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignInEmail')}>
                            <Text style={{color: Colors.darkGreen}}> Sign in.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


