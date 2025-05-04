import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category } from '~/constants/menu.constants.tsx';

export type CategoryState = {
    categories: Category[];
};

const initialState: CategoryState = {
    categories: [],
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, { payload: categories }: PayloadAction<Category[]>) {
            state.categories = categories;
        },
    },
});

export const selectCategories = (state: CategoryState) => state.categories;

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
