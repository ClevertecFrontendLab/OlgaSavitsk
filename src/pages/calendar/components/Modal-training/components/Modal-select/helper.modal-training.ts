import { TrainingFormValue } from '@pages/calendar/types';
import { TrainingListResponse, TrainingResponse } from '@redux/training';
import { Dayjs } from 'dayjs';

export const selectOptions = (
    userTraining: TrainingResponse[],
    trainingsList: TrainingListResponse[],
): TrainingListResponse[] => {
    const trainingExistName = userTraining.map((training) => training.name);
    return trainingsList.filter((traingName) => !trainingExistName.includes(traingName.name));
};

export const createdTraining = (
    createdExercisesList: TrainingFormValue[],
    selectValue: string,
    selectDate: Dayjs | undefined,
) => {
    return (
        createdExercisesList &&
        createdExercisesList
            .filter((training: TrainingFormValue) => training.name === selectValue)
            .flatMap((training: TrainingFormValue) => ({ ...training, date: selectDate }))
    );
};
