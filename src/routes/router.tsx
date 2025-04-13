import { createBrowserRouter } from 'react-router';

import { routerConfig } from './router-config';

export const AppRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    routerConfig,
]);
