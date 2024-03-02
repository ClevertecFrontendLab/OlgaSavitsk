import { LoaderAction, LoaderTypes } from '@redux/loader';

import { FeedbacksAction, FeedbacksResponse, FeedbacksTypes } from '../types';

export const setLoadingFeedBacks = (payload: boolean): LoaderAction<boolean> => ({
    type: LoaderTypes.SET_LOADING,
    payload: payload,
});

export const getFeedbacks = () => ({
    type: FeedbacksTypes.GET_FEEDBACKS,
});

export const setFeedbacks = (
    payload: FeedbacksResponse[],
): FeedbacksAction<FeedbacksResponse[]> => ({
    type: FeedbacksTypes.SET_FEEDBACKS,
    payload,
});

export const feedbacksError = (status: string): FeedbacksAction<string> => ({
    type: FeedbacksTypes.FEEDBACKS_ERROR,
    payload: status,
});
