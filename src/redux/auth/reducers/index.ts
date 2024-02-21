import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { authReducer } from './auth.reducer';

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const reducer = combineReducers({
    router: routerReducer,
    authReducer,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
