import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const reducer = combineReducers({
    router: routerReducer,
});

// export type State = ReturnType<typeof reducer>;

export default reducer;
