import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { clearAppError, setAppError } from '~/store/app-slice';

import { API_URL } from './constants/common';

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
    api.dispatch(clearAppError());
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        const errorData = result.error as FetchBaseQueryError;
        api.dispatch(setAppError(errorData?.status));
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: () => ({}),
});
