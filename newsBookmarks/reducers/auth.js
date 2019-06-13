import {AsyncStorage} from 'react-native';

const initialState = {
    token: AsyncStorage.getItem('userToken'),
    isAuthenticated: false,
    user: null,
    errors: {}
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESSFUL':
        case 'USER_LOADED':
        case 'REGISTRATION_SUCCESSFUL':
            try {
                AsyncStorage.setItem("userToken", action.data.token)
            } catch {

            }
            return {...state, ...action.user, isAuthenticated: true};

        case 'AUTHENTICATION_ERROR':
            AsyncStorage.removeItem("userToken");
            return {
                ...state, token: null, user: null,
                isAuthenticated: false
            };
        case 'LOGIN_FAILED':
        case 'REGISTRATION_FAILED':
        case 'LOGOUT_SUCCESSFUL':
            AsyncStorage.removeItem("userToken");
            return {
                ...state, errors: action.data, token: null, user: null,
                isAuthenticated: false
            };

        default:
            return state;
    }
}
