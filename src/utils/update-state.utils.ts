import { TrainingState, TrainingResponse } from "@redux/training";

export const updateState = (state: TrainingState, payload: TrainingResponse) => {
    const index: number = state.trainings.findIndex((val) => val._id === payload._id);
    state.trainings[index] = { ...payload };
    return state.trainings;
};