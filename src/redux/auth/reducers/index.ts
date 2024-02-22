import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { authReducer } from './auth.reducer';

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1
});

const reducer = combineReducers({
    router: routerReducer,
    authStore: authReducer,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
