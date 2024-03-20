import { spawn } from 'redux-saga/effects';

import { watchAuth } from './auth/saga';
import { watchFeedbacks } from './feedbacks/saga';
import { watchTraining } from './training/saga';

export default function* rootSaga() {
    yield spawn(watchAuth);
    yield spawn(watchFeedbacks);
    yield spawn(watchTraining);
}
