import { TrainingListResponse, TrainingResponse } from '@redux/training';

import apiService from './api.service';

export function getTraining<T>(params: T): Promise<TrainingResponse[]> {
    return apiService.get('/training', params);
}

export function getTrainingList (): Promise<TrainingListResponse[]> {
    return apiService.get('/catalogs/training-list');
}

export function postTraining<T>(data: T): Promise<void> {
    return apiService.post('/training', data);
}