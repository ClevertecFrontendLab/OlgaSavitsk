import { ITEMS_PER_PAGE } from '~/constants/recipes.constants';
import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { ApiResponse, Recipe, RecipeParams } from '~/shared/types/recipe.types';
import { setAppLoader } from '~/store/app-slice';

import { IMAGE_URL } from '../constants/common';

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
                    params: {
                        page: params.page || 1,
                        limit: params.limit || ITEMS_PER_PAGE,
                        allergens: params.allergens?.join(','),
                        searchString: params.searchString,
                        meat: params.meat?.join(','),
                        garnish: params.garnish?.join(','),
                        subcategoriesIds: params.subcategoriesIds?.join(','),
                        sortBy: params.sortBy || 'createdAt',
                        sortOrder: params.sortOrder || 'desc',
                    },
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

                providesTags: [Tags.RECIPE],
            }),
            getRecipeByCategory: builder.query<Recipe[], string>({
                query: (id) => ({
                    url: `/recipe/category/${id}`,
                    method: 'GET',
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
                    url: `/recipe/${id}`,
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
            getNewestRecipes: builder.query<Recipe[], number>({
                query: (limit = 10) => ({
                    url: ApiEndpoints.RECIPES,
                    params: {
                        limit,
                        sortBy: 'createdAt',
                        sortOrder: 'desc',
                    },
                }),
                transformResponse: (response: ApiResponse<Recipe>) => response.data,
            }),
        }),
    });

export const { useGetRecipesQuery, useGetRecipeByIdQuery, useGetRecipeByCategoryQuery } =
    RecipeapiSlice;

const getImageUrl = (imageUrl: string) => (imageUrl ? `${IMAGE_URL}${imageUrl}` : '');

const transformRecipe = (recipe: Recipe): Recipe => ({
    ...recipe,
    image: getImageUrl(recipe.image),
    steps: recipe.steps?.map((step) => ({
        ...step,
        image: getImageUrl(step.image),
    })),
});
