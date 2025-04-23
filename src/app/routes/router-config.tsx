import { type RouteObject } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { MainLayout } from '~/components/main-layout/main-layout';
import { MainPage } from '~/components/pages/main-page/main-page';

import { deliciousRoot, recipeRoot, veganRoot } from './routes';

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
    ],
};
