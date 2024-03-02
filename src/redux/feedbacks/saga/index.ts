import { LocalStorageKey, RoutePath } from '@constants/index';
import { RootState } from '@redux/configure-store';
import { feedbacksApi } from '@services/index';
import { isAxiosError } from 'axios';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { feedbacksError, setFeedbacks, setLoadingFeedBacks } from '../actions';

function* feedbacksGetWorker() {
    try {
        const { data } = yield call(feedbacksApi.getFeedbacks);
        yield put(setFeedbacks(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 403) {
                yield window.localStorage.removeItem(LocalStorageKey.authToken);
                yield put(push(RoutePath.SignIn));
            } else yield put(feedbacksError('warn'));
        }
    }
}

export function* handleFeedbacks() {
    yield delay(500);
    yield put(setLoadingFeedBacks(true));
    const { pathname } = yield select(({ router }: RootState) => router.location);
    if (pathname === RoutePath.Feedbacks) {
        yield call(feedbacksGetWorker);
    }
    yield put(setLoadingFeedBacks(false));
}

export function* watchFeedbacks() {
    yield takeLatest(LOCATION_CHANGE, handleFeedbacks);
}
