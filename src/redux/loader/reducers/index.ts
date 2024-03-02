import { LoaderAction, LoaderState, LoaderTypes } from '../types';

const initialState: LoaderState = {
    isLoading: false,
};

const loaderReducer = <T>(state = initialState, { type, payload }: LoaderAction<T>) => {
    switch (type) {
        case LoaderTypes.SET_LOADING: {
            return { ...state, isLoading: payload };
        }
        default:
            return state;
    }
};

export default loaderReducer;
