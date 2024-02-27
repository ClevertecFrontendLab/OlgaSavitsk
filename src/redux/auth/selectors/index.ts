import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@redux/configure-store';
import { getPrevLocation } from '@utils/index';

const UseMemmoisedSelector = <T>(selector: (state: RootState) => T) => {
    const result = useSelector(selector);
    return useMemo(() => result, [result]);
};

export const selectAuthLoading = () => {
    return UseMemmoisedSelector(({ authStore }: RootState) => authStore.isLoading);
};

export const selectLocationPath = () => {
    return UseMemmoisedSelector(({ router }: RootState) => router.location?.pathname);
};

export const selectPreviousLocations = () => {
    return UseMemmoisedSelector(({ router }: RootState) => getPrevLocation(router));
};

export const selectAuthStatusCode = () => {
    return UseMemmoisedSelector(({ authStore }: RootState) => authStore.statusCode);
};

export const selectAuthEmail = () => {
    return UseMemmoisedSelector(({ router }: RootState) => router.location?.state as string);
};
