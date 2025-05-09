import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { SpinnerComponent } from '~/shared/components/spinner/spinner';
import { userLoadingSelector } from '~/store/app-slice';

const Layout = lazy(() =>
    import('~/components/main-layout/layout.tsx').then((module) => ({ default: module.Layout })),
);

export const MainLayout = () => {
    const isLoading = useSelector(userLoadingSelector);

    return (
        <>
            <Suspense
                fallback={
                    <SpinnerComponent isLoading={isLoading} dataTestId={DATA_TEST_ID.APP_LOADER} />
                }
            >
                <Layout />
            </Suspense>
        </>
    );
};
