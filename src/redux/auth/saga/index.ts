import { isAxiosError } from 'axios';
import { push } from 'redux-first-history';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AuthAction, AuthTypes, SignUpPayload } from '../types';
import { authApi } from '@services/index';
import { authError, signUpSuccess } from '../actions';
import { RoutePath } from '@constants/index';

// export function* signInWorker() {}

function* signUpWorker(action: AuthAction<SignUpPayload>) {
    try {
        yield call(authApi.signUp, action.payload);
        yield put(push(RoutePath.SignUpSuccess));
        yield put(signUpSuccess());
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            yield put(authError(status));
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
}

export default function* rootSaga() {
    yield all([watchAuth()]);
}
