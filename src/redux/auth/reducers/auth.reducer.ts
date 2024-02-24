import { AuthAction, AuthState, AuthTypes } from '../types';

const initialState: AuthState = {
    token: '',
    isLoading: false,
    statusCode: null,
};

export const authReducer = <T>(state = initialState, { type, payload }: AuthAction<T>) => {
    switch (type) {
        case AuthTypes.SIGNUP_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.SIGNUP_SUCCESS: {
            return { ...state, isLoading: false, statusCode: payload };
        }
        case AuthTypes.SIGNIN_REQUEST: {
            return { ...state, isLoading: true };
        }
        case AuthTypes.SIGNIN_SUCCESS: {
            return { ...state, isLoading: false, token: payload };
        }
        case AuthTypes.SIGNOUT: {
            return { ...state, isLoading: false, statusCode: null, token: undefined };
        }
        case AuthTypes.AUTH_ERROR: {
            return { ...state, isLoading: false, statusCode: payload };
        }
        default:
            return state;
    }
};
