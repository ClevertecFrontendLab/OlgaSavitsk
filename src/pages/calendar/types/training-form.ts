import { Exercises } from '@redux/training';
import { Dayjs } from 'dayjs';

export type TrainingForm = {
   name: TrainingFormValue[]
};

export type TrainingFormValue = {
    name: string;
    date: Dayjs | undefined;
    exercises: Exercises[];
};
