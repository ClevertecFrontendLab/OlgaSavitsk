export enum FeedbacksTypes {
    GET_FEEDBACKS = 'GET_FEEDBACKS',
    SET_FEEDBACKS = 'SET_FEEDBACKS',
    POST_FEEDBACK_REQUEST = 'POST_FEEDBACK_REQUEST',
    POST_FEEDBACK_SUCCESS = 'POST_FEEDBACK_SUCCESS',
    FEEDBACKS_ERROR = 'FEEDBACKS_ERROR',
}

export type FeedbacksState = {
    feedbacks: FeedbacksResponse[];
    statusCode?: 'success' | 'error' | '500' | undefined;
};

export type FeedbacksAction<Payload> = {
    type: FeedbacksTypes;
    payload: Payload;
};

export type FeedbacksReducer = (
    state: FeedbacksState,
    actions: FeedbacksAction<FeedbacksState>,
) => FeedbacksState;

export type FeedbacksResponse = {
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export type FeedbackPayload = {
    message: string;
    rating: number;
};

export type FeedbacksError = {
    statusCode: number;
    error: string;
    message: string;
};
