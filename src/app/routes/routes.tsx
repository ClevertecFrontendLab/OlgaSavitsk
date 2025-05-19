import { type RouteObject } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { CategoryPage } from '~/pages/category-page/category-page';
import { DeliciousPage } from '~/pages/delicious-page/delicious-page';
import { NotFoundPage } from '~/pages/not-found/not-found-page';
import { RecipePage } from '~/pages/recipe-page/recipe-page';

export const categoryRoot: RouteObject = {
    path: RoutePath.category,
    element: <CategoryPage />,
};

export const deliciousRoot: RouteObject = {
    path: RoutePath.delicious,
    element: <DeliciousPage />,
};

export const recipeRoot: RouteObject = {
    path: RoutePath.recipe,
    element: <RecipePage />,
};

export const notFoundRoot: RouteObject = {
    path: RoutePath.notFound,
    element: <NotFoundPage />,
};
