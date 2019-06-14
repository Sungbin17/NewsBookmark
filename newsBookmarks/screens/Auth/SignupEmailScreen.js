import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import GoBackButton from '../../components/GoBackButton';
import {connect} from "react-redux";
import {auth} from "../../actions";

class SignupEmailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '',
        email: '',
        password: ''
    };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.lightGreen,
            borderBottomWidth: 0,
        },
        headerTitle: null,
        headerLeft: (<GoBackButton/>)
    };

    _handleRegister = async () => {
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        if (name.length > 0 && email.length > 0 && password.length > 0) {
            await this.props.register(name, email, password);
            await this.props.login(email, password);
            const auth = this.props.auth;
            if (auth.isAuthenticated){
                this.props.navigation.navigate('AuthLoading')
            }
        } else {
            alert('Field cannot be blank')
        }
    };

    render() {
        return (
            <View style={{...Styles.welcomeContainer, justifyContent: 'top'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign up with Email</Text>
                <Text style={{marginTop: 20, color: 'grey'}}>Your full name</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <Text style={styles.textLabel}>Your Email</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    autoCapitalize='none'
                />
                <Text style={styles.textLabel}>Your Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={this._handleRegister}
                                  style={{...Styles.button, backgroundColor: Colors.darkGreen, marginTop: 50}}>
                    <Text style={{color: 'white'}}>Create account</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 20, width: '80%', height: 40, borderColor: 'grey', borderBottomWidth: 0.5
    },
    textLabel: {
        marginTop: 30, color: 'grey'
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (name, email, password) => {
            return dispatch(auth.register(name, email, password))
        },

        login: (email, password) => {
            return dispatch(auth.login(email, password))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmailScreen);
