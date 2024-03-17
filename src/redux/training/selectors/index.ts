import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';

export const selectTraining = () => {
    return UseMemmoisedSelector(select);
};

export const select = createSelector(
    (state: RootState) => state.trainingStore.trainings,
    (state: RootState) => state.trainingStore.trainingsList,
    (trainings, trainingsList) => ({ trainings, trainingsList }),
);
