import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import {withNavigation} from 'react-navigation';
import {Ionicons} from "@expo/vector-icons";

class ProfileButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => this.props.navigation.navigate('Settings')}
            >
                <Ionicons style={{marginRight: 15}} name="md-contact" size={30} color="grey"/>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(ProfileButton)