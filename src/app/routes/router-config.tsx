import { type RouteObject } from 'react-router';

import { MainLayout } from '~/components/main-layout/main-layout';
import { MainPage } from '~/components/pages/main-page/main-page';

import { deliciousRoot, veganRoot } from './routes';

export const routerConfig: RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <MainPage />,
        },
        veganRoot,
        deliciousRoot,
    ],
};
