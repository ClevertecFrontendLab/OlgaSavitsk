import { Reducer } from 'redux';
import { AuthAction, AuthState, AuthTypes } from '../types';

const initialState = {
    token: '',
    isLoading: false,
    error: null,
};

export const authReducer: Reducer<AuthState, AuthAction<string>> = (
    state = initialState,
    { type, payload }: AuthAction<string>,
) => {
    switch (type) {
        case AuthTypes.SIGNUP_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.SIGNUP_SUCCESS: {
            return { ...state, isLoading: false };
        }
        case AuthTypes.AUTH_ERROR: {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
};
