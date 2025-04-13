import { type RouteObject } from 'react-router';

import { DeliciousPage } from '~/components/pages/delicious-page/delicious-page';
import { VeganPage } from '~/components/pages/vegan-page/vegan-page';
import { RoutePath } from '~/constants/routes.constants';

export const veganRoot: RouteObject = {
    path: RoutePath.veganPage,
    element: <VeganPage />,
    children: [
        {
            path: ':id',
        },
    ],
};

export const deliciousRoot: RouteObject = {
    path: RoutePath.delicious,
    element: <DeliciousPage />,
};
