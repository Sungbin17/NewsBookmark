import React from 'react';
import {ScrollView, WebView} from 'react-native';
import GoBackButton from "../components/GoBackButton";
import {withNavigation} from 'react-navigation';
import Styles from "../constants/Styles";

class ArticleScreen extends React.Component {

    render() {
        console.log(this.props.navigation.getParam('url', 'url'))
        return (
            <ScrollView style={{flex:1}}>
                <WebView
                    style={{width: "100%", height: 800,}}
                    source={{uri: this.props.navigation.getParam('url', 'url')}}
                />
            </ScrollView>
        );
    }
}

export default withNavigation(ArticleScreen)


