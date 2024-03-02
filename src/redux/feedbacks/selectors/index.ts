import { RootState } from '@redux/configure-store';
import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const UseMemmoisedSelector = <T>(selector: (state: RootState) => T): T => {
    const result = useSelector(selector);
    return useMemo(() => result, [result]);
};

export const selectFeedbacks = () => {
    return UseMemmoisedSelector(select);
};

export const selectStatusFeedbacks = () => {
    return UseMemmoisedSelector(
        ({ feedbacksStore }: RootState) => feedbacksStore.statusCode as string,
    );
};

export const select = createSelector(
    (state: RootState) => state.feedbacksStore.feedbacks,
    (state: RootState) => state.feedbacksStore.statusCode,
    (feedbacks, statusCode) => ({ feedbacks, statusCode }),
);
