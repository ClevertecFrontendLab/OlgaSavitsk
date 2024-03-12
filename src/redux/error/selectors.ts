import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';

export const selectError = () => {
    return UseMemmoisedSelector(select);
};

export const select = createSelector(
    (state: RootState) => state.error.statusCode,
    (statusCode) => ({ statusCode }),
);
