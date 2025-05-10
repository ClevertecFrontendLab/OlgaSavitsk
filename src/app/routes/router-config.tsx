import { type RouteObject } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { MainLayout } from '~/components/main-layout/main-layout';
import { MainPage } from '~/components/pages/main-page/main-page';
import { NotFoundPage } from '~/components/pages/not-found/not-found-page';

import { categoryRoot, deliciousRoot, notFoundRoot, recipeRoot } from './routes';

export const routerConfig: RouteObject = {
    path: RoutePath.mainPage,
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
};
