import { useEffect, useMemo } from 'react';

import { useLazyGetRecipesWithFiltersQuery } from '~/query/services/recipes';
import { searchTextSelector, selectAppliedFilters } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';

export const useFilteredData = () => {
    const searchText = useAppSelector(searchTextSelector);
    const {
        allergens,
        meatTypes,
        sideDishes,
        category: allCategories,
    } = useAppSelector(selectAppliedFilters);

    const [trigger, { data, isLoading, error }] = useLazyGetRecipesWithFiltersQuery();

    const filterParams = useMemo(
        () => ({
            searchString: searchText || undefined,
            allergens: allergens.length ? allergens : undefined,
            meat: meatTypes.length ? meatTypes : undefined,
            garnish: sideDishes.length ? sideDishes : undefined,
            subcategoriesIds: allCategories.length ? allCategories : undefined,
        }),
        [searchText, allergens, meatTypes, sideDishes, allCategories],
    );

    useEffect(() => {
        if (Object.values(filterParams).some((param) => param !== undefined)) {
            trigger(filterParams);
        }
    }, [filterParams, trigger]);

    return {
        filteredData: data || [],
        isLoading,
        error,
    };
};
