export enum AuthTypes {
    SIGNUP_REQUEST = 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNIN_REQUEST = 'SIGNIN_REQUEST',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    CHECKEMAIL_REQUEST = 'CHECKEMAIL_REQUEST',
    CHECKEMAIL_SUCCESS = 'CHECKEMAIL_SUCCESS',
    CONFIRMEMAIL_REQUEST = 'CONFIRMEMAIL_REQUEST',
    CONFIRMEMAIL_SUCCESS = 'CONFIRMEMAIL_SUCCESS',
    CHANGEPASSWORD_REQUEST = 'CHANGEPASSWORD_REQUEST',
    CHANGEPASSWORD_SUCCESS = 'CHANGEPASSWORD_SUCCESS',
    RESETLOADING = 'RESETLOADING',
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
    password?: string;
    remember?: boolean;
}

export interface CheckAuthResponse {
    email: string;
    message: string;
}

export interface ConfirmEmailRequest {
    email: string,
    code: string
}
export interface ChangePasswordRequest {
  password: string,
  confirmPassword: string
}

export interface AuthResponse {
    token: string;
}

export interface AuthError {
    statusCode: number;
    error: string;
    message: string;
}
