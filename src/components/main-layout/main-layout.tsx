import { useSelector } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { SpinnerComponent } from '~/shared/components/spinner/spinner';
import { userLoadingSelector } from '~/store/app-slice';

import { Layout } from './layout';

export const MainLayout = () => {
    const isLoading = useSelector(userLoadingSelector);

    return (
        <>
            <SpinnerComponent isLoading={!isLoading} dataTestId={DATA_TEST_ID.APP_LOADER} />
            <Layout />
        </>
    );
};
