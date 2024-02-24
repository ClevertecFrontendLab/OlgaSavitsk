export enum AuthTypes {
    SIGNUP_REQUEST = 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNIN_REQUEST = 'SIGNIN_REQUEST',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    AUTH_ERROR = 'AUTH_ERROR',
    SIGNOUT = 'SIGNOUT',
}

export type AuthState = {
    token: string | undefined;
    isLoading: boolean;
    statusCode: number | null;
};

export type AuthAction<Payload> = {
    type: AuthTypes;
    payload: Payload;
};

export type AuthReducer = (state: AuthState, actions: AuthAction<AuthState>) => AuthState;

export interface SignUpPayload {
    email: string;
    password: string;
}

export interface SignInPayload {
    email: string;
    password: string;
    remember?: boolean
}

export interface AuthResponse {
    token: string;
}

export interface AuthError {
    statusCode: number;
    error: string;
    message: string;
}
