import React from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import NewsCard from "../components/NewsCard";
import {bookmark} from "../actions";
import {connect} from "react-redux";

class BookmarkScreen extends React.Component {
    state = {
        news: [],
        refreshing: false,
    };
    static navigationOptions = {
        title: 'Bookmarks',
    };

    componentDidMount() {
        console.log('bookmark')
        this.props.mybookmarks(this.props.auth.token).then(news =>
            this.setState({news})
        )
    }

    _onRefresh = () => {
        console.log('refresh')
        console.log(this.props.auth.token);
        this.props.mybookmarks(this.props.auth.token).then(news => {
            this.setState({refreshing: false, news: news});
        });
    }


    render() {
        return (
            <ScrollView style={{flex: 1, paddingLeft: 15, paddingRight: 10}}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
            >
                {
                    this.state.news !== undefined ?
                        this.state.news.map(result =>
                            <NewsCard result={result} bookmarked={true}/>
                        ) : null
                }

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});


const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        mybookmarks: (token) => {
            return dispatch(bookmark.mybookmarks(token))
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkScreen);