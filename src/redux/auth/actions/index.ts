import { AuthAction, AuthTypes } from '../types';

export const signUpRequest = <T> (
    payload: T,
): AuthAction<T> => ({
    type: AuthTypes.SIGNUP_REQUEST,
    payload,
});

export const signUpSuccess = () => ({
    type: AuthTypes.SIGNUP_SUCCESS,
});

export const authError = (error: unknown) => ({
    type: AuthTypes.AUTH_ERROR,
    payload: {
        status: error,
    },
});
