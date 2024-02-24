import { isAxiosError } from 'axios';
import { push } from 'redux-first-history';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AuthAction, AuthTypes, SignInPayload, SignUpPayload } from '../types';
import { authApi } from '@services/index';
import { authError, signInSuccess, signUpSuccess } from '../actions';
import { LocalStorageKey, RoutePath } from '@constants/index';

function* signInWorker(action: AuthAction<SignInPayload>) {
    try {
        const { accessToken } = yield call(authApi.signIn, action.payload);
        yield put(push(RoutePath.Home));
        yield put(signInSuccess(accessToken));
        if (action.payload.remember) {
            window.localStorage.setItem(
                LocalStorageKey.authToken,
                JSON.stringify({ access_token: accessToken }),
            );
        }
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status) yield put(authError(status));
            yield put(push(RoutePath.SignInError));
        }
    }
}

function* signUpWorker(action: AuthAction<SignUpPayload>) {
    try {
        const { status } = yield call(authApi.signUp, action.payload);
        yield put(signUpSuccess(status));
        yield put(push(RoutePath.SignUpSuccess));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status) yield put(authError(status));
            if (status === 409) {
                yield put(push(RoutePath.SignUpFailed));
            } else {
                yield put(push(RoutePath.Error, action.payload));
            }
        }
    }
}

export function* watchAuth() {
    yield takeLatest(AuthTypes.SIGNUP_REQUEST, signUpWorker);
    yield takeLatest(AuthTypes.SIGNIN_REQUEST, signInWorker);
}

export default function* rootSaga() {
    yield all([watchAuth()]);
}
