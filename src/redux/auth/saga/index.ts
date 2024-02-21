import { authApi } from '@services/index';
import { AuthAction, AuthTypes, SignUpPayload } from '../types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'redux-first-history';
import { authError, signUpSuccess } from '../actions';
import { RoutePath } from '@constants/index';
import { isAxiosError } from 'axios';

// export function* signInWorker() {}

function* signUpWorker(action: AuthAction<SignUpPayload>) {
    try {
        yield call(authApi.signUp, action.payload);
        yield put(signUpSuccess());
        yield put(push(RoutePath.SignUpSuccess));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            console.log(status)
            yield put(authError(status));
            if (status === 409) {
                yield put(push(RoutePath.SignUpFailed));
            } else {
                yield put(push(RoutePath.Error));
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
