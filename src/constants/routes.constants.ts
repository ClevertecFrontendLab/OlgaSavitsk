export enum RoutePath {
    Home = '/main',
    SignUp = '/auth/registration',
    SignUpSuccess = '/result/success',
    SignUpFailed = '/result/error-user-exist',
    SignIn = '/auth',
    SignInError = '/result/error-login',
    Error = '/result/error',
    ConfirmEmail = '/auth/confirm-email',
    ResetPassword = '/auth/change-password',
}
