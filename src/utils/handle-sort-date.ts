import { FeedbacksResponse } from '@redux/feedbacks';

export const handleSortDate = (data: FeedbacksResponse[]) => {
    return sort(data, sortByDate);
};

const sort = (data: FeedbacksResponse[], action: CallableFunction): FeedbacksResponse[] => {
    const sorted = data.sort((a: FeedbacksResponse, b: FeedbacksResponse) =>
        action(a, b) ? -1 : 1,
    );
    return sorted;
};

const sortByDate = (a: FeedbacksResponse, b: FeedbacksResponse): boolean => {
    return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime();
};
