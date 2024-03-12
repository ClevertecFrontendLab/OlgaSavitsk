import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';

import { authReducer } from './auth';
import { feedbacksReducer } from './feedbacks';
import { loaderReducer } from './loader';
import { trainingReducer } from './training';
import { errorReducer } from './error';

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

const reducer = combineReducers({
    router: routerReducer,
    authStore: authReducer,
    feedbacksStore: feedbacksReducer,
    loader: loaderReducer,
    error: errorReducer,
    trainingStore: trainingReducer,
});

export default reducer;
