import AuthActionTypes from './auth.types';
import { checkForStoredUser, saveNewUser, safeguardUser, signInUser } from './auth.utils';
import Strings from '../../config/strings';

const initialState = {
    users: null,
    activeUser: null,
    success: false,
    error: null,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionTypes.CHECK_USER_SESSION: {
            const users = state.users || checkForStoredUser();
            return { ...state, users: safeguardUser(users) };
        }

        case AuthActionTypes.CREATE_NEW_ACCOUNT: {
            const newUsers = saveNewUser(action.payload);
            return { ...state, users: safeguardUser(newUsers) };
        }

        case AuthActionTypes.SIGN_IN: {
            const { userIndex, password } = action.payload;
            const signInSuccess = signInUser(userIndex, password);
            if (signInSuccess) {
                return { ...state, activeUser: state.users[userIndex], success: true };
            }
            return {
                ...state,
                error: { text: Strings.INCORRECT_PASSWORD, __id: new Date().getTime() },
            };
        }

        case AuthActionTypes.LOGOUT_USER: {
            return { ...state, success: null, error: null, activeUser: null };
        }

        default:
            return { ...state, users: safeguardUser(state.users) };
    }
};

export default AuthReducer;
