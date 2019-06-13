import React from 'react';
import {TouchableOpacity} from "react-native";
import SvgUri from 'react-native-svg-uri';
import {withNavigation} from 'react-navigation';

class GoBackButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={this.props.navigateScreen ? () => this.props.navigation.navigate(this.props.navigateScreen) :
                    () => this.props.navigation.goBack(null)}
            >
                <SvgUri
                    width="20"
                    height="20"
                    source={require('../assets/images/back.svg')}
                />
            </TouchableOpacity>
        );
    }
}

export default withNavigation(GoBackButton)