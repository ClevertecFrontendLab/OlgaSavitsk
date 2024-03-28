import { LOCATION_CHANGE } from 'redux-first-history';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { call, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { HttpStatusCode } from '@constants/index';
import { RoutePath } from '@constants/routes.constants';
import { selectLocation } from '@redux/feedbacks';
import { setLoadingTraining } from '@redux/training/actions';
import { NotUndefined } from '@redux-saga/types';
import { userApi } from '@services/index';
import { AxiosProgressEvent, isAxiosError } from 'axios';

import {
    putUserSuccess,
    setErrorUser,
    setUser,
    uploadFileSuccess,
    uploadProgress,
} from '../actions';
import { selectUser, UploadPayload, UserAction, UserPayload, UserTypes } from '..';

function* userGetWorker() {
    try {
        const { data } = yield call(userApi.getUser);

        yield put(setUser(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) {
                yield put(setErrorUser(status));
            }
        }
    }
}

function* userPutWorker({ payload }: UserAction<UserPayload>) {
    try {
      
        const { data } = yield call(userApi.updateUser, payload);

        yield put(putUserSuccess(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) {
                yield put(setErrorUser('error'));
            }
        }
    }
}

function createUploader(files: UploadPayload): EventChannel<NotUndefined> {
    return eventChannel((emmiter) => {
        const uploadProgressCb = ({ progress }: AxiosProgressEvent) => {
            const percent = progress ? Math.ceil(progress * 100) : 0;

            emmiter(percent);
            if (percent === 100) emmiter(END);
        };

        apiUpload(files, uploadProgressCb)

        return () => {};
    });
}

function apiUpload(files: UploadPayload, uploadProgressCb: ({ progress }: AxiosProgressEvent) => void) {
    try {
        userApi.uploadFile(files, uploadProgressCb);
    } catch (error) {
        if (isAxiosError(error)) {
            put(setErrorUser('500'));
        }
    }
}

function* uploadProgressWatcher(channel: EventChannel<NotUndefined>) {
    while (true) {
        try {
            const progress: number = yield take(channel);

            yield put(uploadProgress(progress));
        } catch (err) {
            yield put(uploadProgress(0));
        }
    }
}

function* fileUploadWorker(action: UserAction<UploadPayload>) {
    try {
        const uploadChannel: EventChannel<NotUndefined> = yield call(
            createUploader,
            action.payload,
        );

        yield fork(uploadProgressWatcher, uploadChannel);
        
        const { data } = yield call(userApi.uploadFile, action.payload);

        yield put(uploadFileSuccess(data));
        const { user } = yield select(selectUser);

        if (user) yield call(userApi.updateUser, { ...user, imgSrc: user.imgSrc });
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status === HttpStatusCode.CONFLICT) {
                yield put(setErrorUser(status));
            }
        }
    }
}

export function* handleGetUser() {
    yield put(setLoadingTraining(true));
    const { pathname } = yield select(selectLocation);

    if (pathname === RoutePath.Home) {
        yield call(userGetWorker);
    }
    yield put(setLoadingTraining(false));
}

export function* handlePutUser(action: UserAction<UserPayload>) {
    yield put(setErrorUser(undefined));
    yield call(userPutWorker, action);
}

export function* handleFileUpload(action: UserAction<UploadPayload>) {
    yield put(setErrorUser(undefined));
    yield call(fileUploadWorker, action);
}

export function* watchUser() {
    yield takeLatest(LOCATION_CHANGE, handleGetUser);
    yield takeEvery(UserTypes.UPLOAD_FILE_REQUEST, handleFileUpload);
    yield takeLatest(UserTypes.UPDATE_USER_REQUEST, handlePutUser);
}
