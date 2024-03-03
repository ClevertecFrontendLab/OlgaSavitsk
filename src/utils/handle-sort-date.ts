import { FeedbacksResponse } from '@redux/feedbacks';

const handleSortDate = (data: FeedbacksResponse[]) => {
    return sort(data, sortByDate);
};

function sort(data: FeedbacksResponse[], action: CallableFunction): FeedbacksResponse[] {
    const sorted = data.sort((a: FeedbacksResponse, b: FeedbacksResponse) =>
        action(a, b) ? -1 : 1,
    );
    return sorted;
}

function sortByDate(a: FeedbacksResponse, b: FeedbacksResponse): boolean {
    return new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime();
}

export default handleSortDate;
