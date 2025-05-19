import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { clearAppError, setAppError, setCredentials, tokenSelector } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';

import { API_URL } from './constants/common';
import { HandleAuthToken } from './utils/auth.utils';
import { handleApiError } from './utils/error';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = tokenSelector(getState() as ApplicationState);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryHandling: typeof baseQuery = async (args, api, extraOptions) => {
    const { dispatch } = api;
    dispatch(clearAppError());

    try {
        const result = await baseQuery(args, api, extraOptions);

        const accessToken = result.meta?.response?.headers.get('Authentication-Access');
        if (accessToken) {
            HandleAuthToken(accessToken);
            dispatch(setCredentials({ accessToken }));
        }

        if (result.error) {
            handleApiError(result.error, dispatch);
        }

        return result;
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAppError(error.message));
        }
        throw error;
    }
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryHandling,
    endpoints: () => ({}),
});
