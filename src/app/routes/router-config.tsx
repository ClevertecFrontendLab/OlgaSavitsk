import { type RouteObject } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { MainLayout } from '~/components/main-layout/main-layout';
import { MainPage } from '~/components/pages/main-page/main-page';
import { NotFoundPage } from '~/components/pages/not-found/not-found-page';

import { deliciousRoot, notFoundRoot, recipeRoot, veganRoot } from './routes';

export const routerConfig: RouteObject = {
    path: RoutePath.mainPage,
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <MainPage />,
        },
        veganRoot,
        deliciousRoot,
        recipeRoot,
        notFoundRoot,
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ],
};
