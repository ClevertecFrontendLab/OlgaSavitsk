import { type RouteObject } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { SignInPage } from '~/pages/auth/signin-page';
import { SignUpPage } from '~/pages/auth/signup-page';
import { MainPage } from '~/pages/main-page/main-page';
import { NotFoundPage } from '~/pages/not-found/not-found-page';
import { PageConfig } from '~/pages/page-config';
import { MainLayout } from '~/pages/page-config/main-layout/main-layout';
import { UnauthorizedLayout } from '~/pages/page-config/unauthorized-layout';

import { categoryRoot, deliciousRoot, notFoundRoot, recipeRoot } from './routes';

export const routerConfig: RouteObject = {
    path: RoutePath.mainPage,
    element: <PageConfig />,
    children: [
        {
            path: RoutePath.auth,
            element: <UnauthorizedLayout />,
            children: [
                {
                    index: true,
                    path: RoutePath.signin,
                    element: <SignInPage />,
                },
                {
                    path: RoutePath.signup,
                    element: <SignUpPage />,
                },
            ],
        },
        {
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <MainPage />,
                },
                categoryRoot,
                deliciousRoot,
                recipeRoot,
                notFoundRoot,
                {
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ],
};
