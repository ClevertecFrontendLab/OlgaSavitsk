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

export enum LayoutType {
    MAIN = 'main',
    UNAUTH = 'unauth',
}

type RoutesLayout = {
    [key in RoutePath]?: {
        layout: LayoutType;
    };
};

export const routesLayout: RoutesLayout = {
    [RoutePath.Home]: {
        layout: LayoutType.MAIN,
    },
    [RoutePath.SignIn]: {
        layout: LayoutType.UNAUTH,
    },
    [RoutePath.SignUp]: {
        layout: LayoutType.UNAUTH,
    },
};
