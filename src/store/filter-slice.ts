import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';

export type FiltersState = typeof initialState;

const initialState = {
    searchText: '' as string | null,
    allergens: [] as string[],
    filterAllergens: [] as string[],
    meatTypes: [] as string[],
    sideDishes: [] as string[],
    authors: [] as string[],
    category: [] as string[],
    appliedFilters: {
        allergens: [] as string[],
        meatTypes: [] as string[],
        sideDishes: [] as string[],
        authors: [] as string[],
        category: [] as string[],
    },
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchText: (state, { payload: searchText }: PayloadAction<string | null>) => {
            state.searchText = searchText;
        },
        setAllergen: (state, action: PayloadAction<string[]>) => {
            state.allergens = action.payload;
        },

        setFilterAllergen: (state, action: PayloadAction<string[]>) => {
            state.filterAllergens = action.payload;
        },

        removeAllergen: (state, action: PayloadAction<string>) => {
            state.allergens = state.allergens.filter((a) => a !== action.payload);
        },

        setMeatTypes: (state, action: PayloadAction<string[]>) => {
            state.meatTypes = action.payload;
        },
        setSideDishes: (state, action: PayloadAction<string[]>) => {
            state.sideDishes = action.payload;
        },
        setAuthors: (state, action: PayloadAction<string[]>) => {
            state.authors = action.payload;
        },
        setCategory: (state, action: PayloadAction<string[]>) => {
            state.category = action.payload;
        },
        applyFilters: (state) => {
            state.appliedFilters = {
                allergens: [...state.allergens],
                meatTypes: [...state.meatTypes],
                sideDishes: [...state.sideDishes],
                authors: [...state.authors],
                category: [...state.category],
            };
        },
        resetFilters: () => initialState,
    },
});

export const searchTextSelector = (state: ApplicationState) => state.filters.searchText;
export const selectAllergens = (state: { filters: FiltersState }) => state.filters.allergens;
export const selectFilterAllergens = (state: { filters: FiltersState }) =>
    state.filters.filterAllergens;
export const selectMeatTypes = (state: { filters: FiltersState }) => state.filters.meatTypes;
export const selectSideDishes = (state: { filters: FiltersState }) => state.filters.sideDishes;
export const selectAuthors = (state: { filters: FiltersState }) => state.filters.authors;
export const selectCategory = (state: { filters: FiltersState }) => state.filters.category;
export const selectAppliedFilters = (state: { filters: FiltersState }) =>
    state.filters.appliedFilters;
export const hasActiveFiltersSelector = (state: { filters: FiltersState }) => {
    const { allergens, filterAllergens, meatTypes, sideDishes, authors, category } = state.filters;
    return Boolean(
        state.filters.searchText ||
            allergens.length ||
            filterAllergens.length ||
            meatTypes.length ||
            sideDishes.length ||
            authors.length ||
            category.length,
    );
};

export const {
    setSearchText,
    setAllergen,
    setFilterAllergen,
    setMeatTypes,
    setSideDishes,
    setAuthors,
    setCategory,
    removeAllergen,
    applyFilters,
    resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
