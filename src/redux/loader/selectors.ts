import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';

export const selectLoading = () => {
    return UseMemmoisedSelector(({ loader }: RootState) => loader.isLoading);
};
