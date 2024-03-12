import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { getPrevLocation } from '@utils/index';


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
