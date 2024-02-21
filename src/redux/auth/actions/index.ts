import { AuthAction, AuthTypes, SignUpPayload } from '../types';

export const signUpRequest = (payload: SignUpPayload): AuthAction<SignUpPayload> => ({
    type: AuthTypes.SIGNUP_REQUEST,
    payload,
}
);

export const signUpSuccess = () => ({
    type: AuthTypes.SIGNUP_SUCCESS,
});

export const authError = (error: unknown) => ({
    type: AuthTypes.AUTH_ERROR,
    payload: {
        status: error,
    },
});
