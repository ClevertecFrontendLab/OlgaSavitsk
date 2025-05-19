import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { DEFAULT_STORAGE_CONFIG, LocalStorageKey } from '~/constants/storage.constants';
import { SpinnerComponent } from '~/shared/components/spinner/spinner';
import { useStorage } from '~/shared/hooks/storage.hook';
import { userLoadingSelector } from '~/store/app-slice';

export const PageConfig = () => {
    const isLoading = useSelector(userLoadingSelector);
    const { state } = useStorage(LocalStorageKey.accessToken, DEFAULT_STORAGE_CONFIG);
    const location = useLocation();

    const publicPaths = [RoutePath.signin, RoutePath.signup];

    if (!state?.accessToken && !publicPaths.includes(location.pathname)) {
        return <Navigate to={RoutePath.signin} replace />;
    }

    return (
        <Suspense
            fallback={
                <SpinnerComponent isLoading={isLoading} dataTestId={DATA_TEST_ID.APP_LOADER} />
            }
        >
            <Outlet />
        </Suspense>
    );
};
