import React from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View,} from 'react-native';
import {auth} from "../actions";
import {connect} from "react-redux";

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
            const user = await this.props.loadUser(userToken);
            console.log(this.props.auth)
            if (user.isAuthenticated){
                this.props.navigation.navigate('Main')
            }
            else{
                this.props.navigation.navigate('Auth');
            }
        } else {
            this.props.navigation.navigate('Auth');
        }


    };

    render() {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadUser: (userToken) => {
            return dispatch(auth.loadUser(userToken))
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);