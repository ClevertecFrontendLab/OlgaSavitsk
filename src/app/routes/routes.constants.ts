export const RoutePath = {
    mainPage: '/',
    veganPage: '/vegan',
    delicious: '/the-juiciest',
    category: '/:category/:subcategory',
    recipe: '/:category/:subcategory/:id',
    auth: '/auth',
    signin: '/auth/signin',
    signup: '/auth/signup',
    forgotPassword: '/forgotPassword',
    notFound: '/not-found',
};

export const breadcrumbNameMap: Record<string, string> = {
    [RoutePath.veganPage]: 'Веганская кухня',
    [RoutePath.delicious]: 'Самое сочное',
};
