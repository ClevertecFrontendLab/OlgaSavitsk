import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { CategoryItem } from '~/shared/types/navigation.types';

import { IMAGE_URL } from '../constants/common';

export const CategoryapiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORY],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<CategoryItem[], void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORIES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),
                transformResponse: (response: CategoryItem[]) =>
                    response.filter((item) => Boolean(item.subCategories)).map(transformCategory),

                providesTags: [Tags.CATEGORY],
            }),
        }),
    });

export const { useGetCategoriesQuery } = CategoryapiSlice;

const getImageUrl = (imageUrl: string) => (imageUrl ? `${IMAGE_URL}${imageUrl}` : '');

const transformCategory = (category: CategoryItem): CategoryItem => ({
    ...category,
    icon: getImageUrl(category.icon),
});
