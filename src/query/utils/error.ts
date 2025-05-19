import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { setAppError } from '~/store/app-slice';
import { AppDispatch } from '~/store/configure-store';

export const handleApiError = (error: FetchBaseQueryError, dispatch: AppDispatch) => {
    const errorCode = error.status;
    dispatch(setAppError(errorCode));
};
