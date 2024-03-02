import { RootState } from '@redux/configure-store';
import { getPrevLocation } from '@utils/index';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const UseMemmoisedSelector = <T>(selector: (state: RootState) => T) => {
    const result = useSelector(selector);
    return useMemo(() => result, [result]);
};

export const selectAuthLoading = () => {
    return UseMemmoisedSelector(({ authStore }: RootState) => authStore.isLoading);
};

export const selectAuthToken = () => {
    return UseMemmoisedSelector(({ authStore }: RootState) => authStore.token as string);
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
