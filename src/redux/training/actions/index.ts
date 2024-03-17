import { ErrorAction, ErrorPayloadType, ErrorTypes } from '@redux/error';
import { LoaderAction, LoaderTypes } from '@redux/loader';
import { LOCATION_CHANGE } from 'redux-first-history';

import {
    TrainingAction,
    TrainingListResponse,
    TrainingResponse,
    TrainingTypes,
} from '../types';
import { TrainingFormValue } from '@pages/calendar/types';

export const setLoadingTraining = (payload: boolean): LoaderAction<boolean> => ({
    type: LoaderTypes.SET_LOADING,
    payload: payload,
});

export const getTraining = () => ({
    type: TrainingTypes.GET_TRAINING,
});

export const setTrainiing = (payload: TrainingResponse[]): TrainingAction<TrainingResponse[]> => ({
    type: TrainingTypes.SET_TRAINING,
    payload,
});

export const getTrainingList = () => ({
    type: LOCATION_CHANGE,
});

export const setTrainiingList = (
    payload: TrainingListResponse[],
): TrainingAction<TrainingListResponse[]> => ({
    type: TrainingTypes.SET_TRAINING_LIST,
    payload,
});

export const postTrainingRequest = (payload: TrainingFormValue): TrainingAction<TrainingFormValue> => ({
    type: TrainingTypes.POST_TRAINING_REQUEST,
    payload,
});

export const postTrainingSuccess = () => ({
    type: TrainingTypes.POST_TRAINING_SUCCESS,
});

export const setErrorTraining = (payload: ErrorPayloadType): ErrorAction<ErrorPayloadType> => ({
    type: ErrorTypes.SET_ERROR,
    payload: payload,
});
