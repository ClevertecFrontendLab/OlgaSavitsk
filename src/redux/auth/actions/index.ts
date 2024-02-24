import { AuthAction, AuthResponse, AuthTypes } from '../types';

export const signUpRequest = <T>(payload: T): AuthAction<T> => ({
    type: AuthTypes.SIGNUP_REQUEST,
    payload,
});

export const signUpSuccess = (status: number): AuthAction<number> => ({
    type: AuthTypes.SIGNUP_SUCCESS,
    payload: status,
});

export const signInRequest = <T>(payload: T): AuthAction<T> => ({
    type: AuthTypes.SIGNIN_REQUEST,
    payload,
});

export const signInSuccess = (accessToken: AuthResponse): AuthAction<AuthResponse> => ({
    type: AuthTypes.SIGNIN_SUCCESS,
    payload: accessToken,
});

export const signOut = () => ({
    type: AuthTypes.SIGNOUT,
});

export const authError = (status: number): AuthAction<number> => ({
    type: AuthTypes.AUTH_ERROR,
    payload: status,
});
