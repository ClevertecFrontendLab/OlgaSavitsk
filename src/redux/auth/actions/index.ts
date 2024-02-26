import {
    AuthAction,
    AuthResponse,
    AuthTypes,
    ChangePasswordRequest,
    ConfirmEmailRequest,
} from '../types';

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

export const resetLoading = (isloading: boolean): AuthAction<boolean> => ({
    type: AuthTypes.RESETLOADING,
    payload: isloading,
});

export const signOut = () => ({
    type: AuthTypes.SIGNOUT,
});

export const checkEmailRequest = <T>(payload: T): AuthAction<T> => ({
    type: AuthTypes.CHECKEMAIL_REQUEST,
    payload,
});

export const checkEmailSuccess = (status: number): AuthAction<number> => ({
    type: AuthTypes.CHECKEMAIL_SUCCESS,
    payload: status,
});

export const confirmEmailRequest = (
    payload: ConfirmEmailRequest,
): AuthAction<ConfirmEmailRequest> => ({
    type: AuthTypes.CONFIRMEMAIL_REQUEST,
    payload,
});

export const confirmEmailSuccess = () => ({
    type: AuthTypes.CONFIRMEMAIL_SUCCESS,
});

export const changePasswordRequest = (
    payload: ChangePasswordRequest,
): AuthAction<ChangePasswordRequest> => ({
    type: AuthTypes.CHANGEPASSWORD_REQUEST,
    payload,
});

export const changePasswordSuccess = (status: number): AuthAction<number> => ({
    type: AuthTypes.CHANGEPASSWORD_SUCCESS,
    payload: status,
});

export const authError = (status: number): AuthAction<number> => ({
    type: AuthTypes.AUTH_ERROR,
    payload: status,
});
