import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SvgUri from 'react-native-svg-uri';
import {bookmark, auth} from "../actions";
import {connect} from "react-redux";
import {withNavigation} from 'react-navigation';

function formatDate(date) {
    let year = date.split('-')[0];
    let month = date.split('-')[1];
    let day = date.split('-')[2].split('T')[0];
    let formatedDate = year + '-' + month + '-' + day;
    return formatedDate
}

class NewsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarked: this.props.bookmarked
        }
    }

    _showArticle(url) {
        this.props.navigation.navigate('Article', {url: url})
    }

    _bookmark() {
        // console.log(this.props.auth)
        if (this.state.bookmarked) {
            this.props.remove_bookmark(this.props.result.headline, this.props.result.web_url, this.props.result.pub_date, this.props.result.image_url, this.props.auth.token, 'remove');
            this.setState({bookmarked: !this.state.bookmarked})
        } else {
            this.props.add_bookmark(this.props.result.headline, this.props.result.web_url, this.props.result.pub_date, this.props.result.image_url, this.props.auth.token);
            this.setState({bookmarked: !this.state.bookmarked})
        }
    }

    render() {
        return (
            <View style={styles.card}>

                <View style={{flexDirection: 'column', width: '70%'}}>
                    <TouchableOpacity onPress={() => this._showArticle(this.props.result.web_url)}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.result.headline}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Text style={{fontSize: 14, color: 'grey'}}>
                            {formatDate(this.props.result.pub_date)}
                        </Text>
                        <TouchableOpacity onPress={() => this._bookmark()}>
                            {
                                this.state.bookmarked ?
                                    <SvgUri
                                        style={{marginLeft: 20}}
                                        width="20"
                                        height="20"
                                        source={require('../assets/images/bookmarked.svg')}/> :
                                    <SvgUri
                                        style={{marginLeft: 20}}
                                        width="20"
                                        height="20"
                                        source={require('../assets/images/bookmark.svg')}
                                    />

                            }
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    this.props.result.image_url ?
                        <TouchableOpacity onPress={() => this._showArticle()}>
                            <Image
                                style={{width: 100, height: 100, marginLeft: 'auto'}}
                                source={{uri: this.props.result.image_url}}
                            />
                        </TouchableOpacity> : null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        borderBottomWidth: 0.3,
        borderColor: 'grey'
    },
});

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        add_bookmark: (headline, web_url, pub_date, image_url, token) => {
            return dispatch(bookmark.add_bookmark(headline, web_url, pub_date, image_url, token))
        },
        remove_bookmark: (headline, web_url, pub_date, image_url, token, remove) => {
            return dispatch(bookmark.remove_bookmark(headline, web_url, pub_date, image_url, token, remove))
        },


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewsCard));