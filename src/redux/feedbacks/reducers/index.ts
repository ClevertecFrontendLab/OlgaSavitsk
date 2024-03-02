import { FeedbacksAction, FeedbacksResponse, FeedbacksState, FeedbacksTypes } from '../types';

const initialState: FeedbacksState = {
    feedbacks: [],
    statusCode: undefined,
};

const feedbacksReducer = <T>(state = initialState, { type, payload }: FeedbacksAction<T>) => {
    switch (type) {
        case FeedbacksTypes.GET_FEEDBACKS: {
            return state;
        }
        case FeedbacksTypes.SET_FEEDBACKS: {
            return {
                ...state,
                feedbacks: payload as FeedbacksResponse[],
            };
        }
        case FeedbacksTypes.FEEDBACKS_ERROR: {
            return { ...state, statusCode: payload };
        }
        default:
            return state;
    }
};

export default feedbacksReducer;
