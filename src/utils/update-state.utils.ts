import { TrainingResponse,TrainingState } from '@redux/training';

export const updateState = (state: TrainingState, payload: TrainingResponse) => {
    const index: number = state.trainings.findIndex((val) => val._id === payload._id);

    const updatedState = {...state}

    updatedState.trainings[index] = { ...payload };

    return updatedState.trainings;
};