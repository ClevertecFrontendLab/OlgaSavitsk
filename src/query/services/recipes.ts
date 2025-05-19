import { ITEMS_PER_PAGE } from '~/constants/recipes.constants';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { ApiResponse, Recipe, RecipeParams } from '~/shared/types/recipe.types';
import { setAppLoader } from '~/store/app-slice';
import { setFilterLoader, setRecipes } from '~/store/recipe-slice';

import { IMAGE_URL } from '../constants/common';

const getParams = (params: RecipeParams, defaultSortOrder = params.sortOrder) => ({
    page: params.page || 1,
    limit: params.limit || ITEMS_PER_PAGE,
    allergens: params.allergens?.join(','),
    searchString: params.searchString,
    meat: params.meat?.join(','),
    garnish: params.garnish?.join(','),
    subcategoriesIds: params.subcategoriesIds?.join(','),
    sortBy: params.sortBy || 'createdAt',
    sortOrder: defaultSortOrder || 'asc',
});

export const RecipeapiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<ApiResponse<Recipe>, RecipeParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    params: getParams(params),
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;

                        dispatch(setAppLoader(false));
                    } catch {
                        dispatch(setAppLoader(false));
                    }
                },
                transformResponse: ({ data, meta }: ApiResponse<Recipe>) => ({
                    data: data.map(transformRecipe),
                    meta: meta,
                }),
            }),
            getRecipeByCategory: builder.query<Recipe[], RecipeParams>({
                query: ({ id, ...params }) => ({
                    url: `${ApiEndpoints.RECIPES_BY_CATEGORY}/${id}`,
                    method: 'GET',
                    params: getParams(params),
                    name: EndpointNames.GET_RECIPE_BY_CATEGORY,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;
                        dispatch(setAppLoader(false));
                    } finally {
                        dispatch(setAppLoader(false));
                    }
                },
                transformResponse: ({ data }: ApiResponse<Recipe>) => data.map(transformRecipe),
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: 'GET',
                    name: EndpointNames.GET_RECIPE_BY_ID,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setAppLoader(true));
                        await queryFulfilled;
                        dispatch(setAppLoader(false));
                    } finally {
                        dispatch(setAppLoader(false));
                    }
                },
                transformResponse: (data: Recipe) => transformRecipe(data),
            }),
            getRecipesWithFilters: builder.query<Recipe[], RecipeParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    params: getParams(params),
                    name: EndpointNames.GET_RECIPE_BY_FILTERS,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        dispatch(setFilterLoader(true));
                        const { data } = await queryFulfilled;
                        dispatch(setFilterLoader(false));
                        dispatch(setRecipes(data));
                    } finally {
                        dispatch(setFilterLoader(false));
                    }
                },
                transformResponse: ({ data }: ApiResponse<Recipe>) => data.map(transformRecipe),
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useGetRecipeByCategoryQuery,
    useLazyGetRecipesWithFiltersQuery,
} = RecipeapiSlice;

const getImageUrl = (imageUrl: string) => (imageUrl ? `${IMAGE_URL}${imageUrl}` : '');

const transformRecipe = (recipe: Recipe): Recipe => ({
    ...recipe,
    image: getImageUrl(recipe.image),
    steps: recipe.steps?.map((step) => ({
        ...step,
        image: getImageUrl(step.image),
    })),
});
