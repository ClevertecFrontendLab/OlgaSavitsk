import { type RouteObject } from 'react-router';

import { CategoryPage } from '~/components/pages/category-page/category-page';
import { DeliciousPage } from '~/components/pages/delicious-page/delicious-page';
import { RoutePath } from '~/constants/routes.constants';

export const veganRoot: RouteObject = {
    path: '/:category',
    element: <CategoryPage />,
    children: [
        {
            path: ':subcategory',
            element: <CategoryPage />,
        },
    ],
};

export const deliciousRoot: RouteObject = {
    path: RoutePath.delicious,
    element: <DeliciousPage />,
};
