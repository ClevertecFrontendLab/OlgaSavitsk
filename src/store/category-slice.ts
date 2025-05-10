import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryItem } from '~/shared/types/category.types';

export type CategoryState = {
    categories: CategoryItem[];
};

const initialState: CategoryState = {
    categories: [],
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, { payload: categories }: PayloadAction<CategoryItem[]>) {
            state.categories = categories;
        },
    },
});

export const selectCategories = (state: { categories: CategoryState }) => state.categories;

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
