import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import Styles from "../constants/Styles";
import ProfileButton from "../components/ProfileButton";
import {SearchBar} from 'react-native-elements';
import {search} from "../actions";
import {connect} from "react-redux";
import NewsCard from "../components/NewsCard";


class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'News Bookmark',
        headerRight: (
            <ProfileButton/>
        )
    };
    state = {
        keyword: '',
        page: 0,
        news: [],
    };


    updateKeyword = keyword => {
        this.setState({keyword});
    };

    _search = async () => {
        let keyword = this.state.keyword;
        let page = 0;
        keyword = keyword.replace(/ /g, "+");
        let results = await this.props.search_keyword(keyword, page);
        let news = results.news;
        console.log(news);
        this.setState({news: news})
    };

    _nextPage = async () => {
        let page = this.state.page + 1;
        let keyword = this.state.keyword;
        let originalNews = this.state.news;
        let results = await this.props.search_keyword(keyword, page);
        let news = results.news;
        let loadedNews = originalNews.concat(news);
        this.setState({news:loadedNews, page: page})

    };

    render() {
        const {keyword} = this.state;
        return (
            <ScrollView style={{flex: 1, paddingLeft: 15, paddingRight: 10}}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                         onMomentumScrollEnd={this._nextPage}
            >
                <SearchBar
                    placeholder="Search for stories"
                    onChangeText={this.updateKeyword}
                    value={keyword}
                    containerStyle={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    returnKeyType='search'
                    onSubmitEditing={this._search}
                    autoCapitalize='none'
                />
                {
                    this.state.news.map(result =>
                        <NewsCard result={result} bookmarked={false} />
                    )
                }
            </ScrollView>
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
        search_keyword: (keyword, page) => {
            return dispatch(search.search_keyword(keyword, page))
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        // width: '90%'
    },
    inputContainerStyle: {
        backgroundColor: 'white',
    }
});


