import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import categoryReducer, { categorySlice } from './category-slice';
import filterReducer, { filtersSlice } from './filter-slice';
import recipeReducer, { recipeSlice } from './recipe-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [filtersSlice.name]: filterReducer,
    [categorySlice.name]: categoryReducer,
    [recipeSlice.name]: recipeReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
