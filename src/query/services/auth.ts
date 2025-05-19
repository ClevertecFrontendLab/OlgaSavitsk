import { ApiEndpoints } from '~/query/constants/api.ts';
import { apiSlice } from '~/query/create-api.ts';
import { setAppLoader } from '~/store/app-slice';

import {
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    ResetPasswordRequest,
    SignUpRequest,
    VerifyOtpRequest,
} from '../types/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: ApiEndpoints.LOGIN,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        signup: builder.mutation<void, SignUpRequest>({
            query: (data) => ({
                url: ApiEndpoints.SIGNUP,
                method: 'POST',
                body: data,
            }),

            extraOptions: { auth: true },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
            query: (data) => ({
                url: ApiEndpoints.FOGOT,
                method: 'POST',
                body: data,
            }),
        }),
        verifyOtp: builder.mutation<void, VerifyOtpRequest>({
            query: (data) => ({
                url: ApiEndpoints.VERIFY_OTP,
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<void, ResetPasswordRequest>({
            query: (data) => ({
                url: ApiEndpoints.RESET,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
export const {
    useLoginMutation,
    useSignupMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApiSlice;
