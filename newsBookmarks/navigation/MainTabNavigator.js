import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkScreen from "../screens/BookmarkScreen";
import ArticleScreen from "../screens/ArticleScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Article: ArticleScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `md-search${focused ? '' : ''}`
                    : 'md-search'
            }
        />
    ),
};

const BookmarkStack = createStackNavigator({
    Bookmark: BookmarkScreen,
    Article: ArticleScreen
});

BookmarkStack.navigationOptions = {
    tabBarLabel: 'Bookmarks',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'md-bookmarks' : 'md-bookmarks'}
        />
    ),
};


export default createBottomTabNavigator({
    HomeStack,
    BookmarkStack,
});
