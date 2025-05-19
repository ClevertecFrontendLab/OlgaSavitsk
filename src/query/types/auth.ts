export type CredentialsType = {
    email: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword?: string;
};

export type LoginRequest = Pick<CredentialsType, 'login' | 'password'>;

export type LoginResponse = {
    accessToken: string;
};

export type SignUpRequest = CredentialsType;

export type ForgotPasswordRequest = {
    email: string;
};

export type VerifyOtpRequest = {
    email: string;
    otpToken: string;
};

export type ResetPasswordRequest = LoginRequest & {
    passwordConfirm: string;
};
