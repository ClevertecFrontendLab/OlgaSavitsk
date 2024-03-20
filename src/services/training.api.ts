import { TrainingListResponse, TrainingResponse } from '@redux/training';

import apiService from './api.service';
import { TrainingFormValue } from '@pages/calendar/types';

export function getTraining<T>(params: T): Promise<TrainingResponse[]> {
    return apiService.get('/training', params);
}

export function getTrainingList(): Promise<TrainingListResponse[]> {
    return apiService.get('/catalogs/training-list');
}

export function postTraining(data: TrainingFormValue): Promise<void> {
    return apiService.post('/training', data);
}

export function putTraining({ _id, ...trainings }: TrainingResponse): Promise<void> {
    return apiService.put(`/training/${_id}`, trainings);
}
