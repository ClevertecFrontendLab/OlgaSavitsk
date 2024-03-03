import { LocalStorageKey, RoutePath } from '@constants/index';
import { RootState } from '@redux/configure-store';
import { feedbacksApi } from '@services/index';
import { isAxiosError } from 'axios';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { feedbacksError, postFeedbackSuccess, setFeedbacks, setLoadingFeedBacks } from '../actions';
import { FeedbackPayload, FeedbacksAction, FeedbacksTypes } from '../types';

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
            } else yield put(feedbacksError('500'));
        }
    }
}
function* feedbacksPostWorker(action: FeedbacksAction<FeedbackPayload>) {
    try {
        yield call(feedbacksApi.postFeedback, action.payload);
        yield put(postFeedbackSuccess());
        yield put(feedbacksError('success'));
    } catch (error: unknown) {
        yield put(feedbacksError('error'));
    }
}

export function* handleGetFeedbacks() {
    yield delay(100);
    yield put(setLoadingFeedBacks(true));
    const { pathname } = yield select(({ router }: RootState) => router.location);
    if (pathname === RoutePath.Feedbacks) {
        yield call(feedbacksGetWorker);
    }
    yield put(setLoadingFeedBacks(false));
}

export function* handlePostFeedbacks(action: FeedbacksAction<FeedbackPayload>) {
    yield put(setLoadingFeedBacks(true));
    yield call(feedbacksPostWorker, action);
    yield put(setLoadingFeedBacks(false));
}

export function* watchFeedbacks() {
    yield takeLatest(LOCATION_CHANGE, handleGetFeedbacks);
    yield takeLatest(FeedbacksTypes.GET_FEEDBACKS, handleGetFeedbacks);
    yield takeLatest(FeedbacksTypes.POST_FEEDBACK_REQUEST, handlePostFeedbacks);
}
