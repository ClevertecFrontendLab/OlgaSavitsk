import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from './constants/common';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: () => ({}),
});
