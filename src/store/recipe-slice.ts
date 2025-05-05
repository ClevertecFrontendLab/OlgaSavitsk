import { createSlice } from '@reduxjs/toolkit';

import { RecipeapiSlice } from '~/query/services/recipes';
import { Recipe } from '~/shared/types/recipe.types';

export type RecipeState = {
    recipes: Recipe[];
    currentPage: number;
    hasMore: boolean;
};

const initialState: RecipeState = {
    recipes: [],
    currentPage: 1,
    hasMore: true,
};

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        resetRecipes(state) {
            state.recipes = [];
            state.currentPage = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(RecipeapiSlice.endpoints.getRecipes.matchFulfilled, (state, action) => {
            const { data, meta } = action.payload;

            if (meta.page === 1) {
                state.recipes = data;
            } else {
                state.recipes.push(...data);
            }

            state.currentPage = meta.page;
            state.hasMore = meta.page < meta.totalPages;
        });
    },
});

export const selectRecipes = (state: { recipes: RecipeState }) => state.recipes.recipes;
export const selectHasMore = (state: { recipes: RecipeState }) => state.recipes.hasMore;

export default recipeSlice.reducer;
