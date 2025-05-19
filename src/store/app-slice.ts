import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginRequest, SignUpRequest } from '~/query/types/auth';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: null as null | number | string,
    credential: {
        email: '',
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
    } as Partial<LoginRequest | SignUpRequest>,
    isAuthenticated: false,
    accessToken: null as null | string,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<number | string | null>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        clearAppError: (state) => {
            state.error = null;
        },
        setCredentials: (
            state,
            action: PayloadAction<{
                accessToken: string | null;
            }>,
        ) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const userCredentailsSelector = (state: ApplicationState) => state.app.credential;
export const tokenSelector = (state: ApplicationState) => state.app.accessToken;

export const { setAppError, setAppLoader, clearAppError, setCredentials, logout } =
    appSlice.actions;
export default appSlice.reducer;
