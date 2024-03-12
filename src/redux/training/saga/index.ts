import { RoutePath } from '@constants/index';
import { selectLocation } from '@redux/feedbacks';
import { trainingApi } from '@services/index';
import { isAxiosError } from 'axios';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
    postTrainingSuccess,
    setErrorTraining,
    setLoadingTraining,
    setTrainiing,
    setTrainiingList,
} from '../actions';
import { TrainingAction, TrainingPayload, TrainingTypes } from '../types';

function* trainingGetWorker(action: TrainingAction<string>) {
    try {
        yield put(setErrorTraining(undefined));
        const { data } = yield call(trainingApi.getTraining, action.payload);
        yield put(setTrainiing(data));
        yield put(push(RoutePath.Calendar));
    } catch (error: unknown) {
        yield put(setErrorTraining('500'));
    }
}

function* trainingListGetWorker() {
    try {
        const { data } = yield call(trainingApi.getTrainingList);
        yield put(setTrainiingList(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status) {
                yield put(setErrorTraining(status));
            }
        }
    }
}

function* trainingPostWorker(action: TrainingAction<TrainingPayload>) {
    try {
        yield call(trainingApi.postTraining, action.payload);
        yield put(postTrainingSuccess());
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            if (status) {
                yield put(setErrorTraining(status));
            }
        }
    }
}

export function* handleGetTraining(action: TrainingAction<string>) {
    yield put(setLoadingTraining(true));
    yield call(trainingGetWorker, action);
    yield put(setLoadingTraining(false));
}

export function* handleGetTrainingList() {
    yield put(setLoadingTraining(true));
    yield put(setErrorTraining(undefined));

    const { pathname } = yield select(selectLocation);

    if (pathname === RoutePath.Calendar) {
        yield call(trainingListGetWorker);
    }
    yield put(setLoadingTraining(false));
}

export function* handlePostTraining(action: TrainingAction<TrainingPayload>) {
    yield put(setLoadingTraining(true));
    yield call(trainingPostWorker, action);
    yield put(setLoadingTraining(false));
}

export function* watchTraining() {
    yield takeLatest(TrainingTypes.GET_TRAINING, handleGetTraining);
    yield takeLatest(LOCATION_CHANGE, handleGetTrainingList);
    yield takeLatest(TrainingTypes.POST_TRAINING_REQUEST, handlePostTraining);
}
