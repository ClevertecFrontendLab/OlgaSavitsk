import { useMemo } from 'react';

import { Category, categoryMap } from '~/constants/menu.constants';
import {
    searchTextSelector,
    selectAppliedFilters,
    selectFilterAllergens,
} from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';

import { recipes } from '../mock-data/recipes';
import { Recipe } from '../types/recipe.types';
import { isArrayWithItems } from '../utils/common';

const containsKeyword = (text: string, keywords: string[]): boolean => {
    const lowerText = text.toLowerCase();

    return keywords.some((keyword) => {
        const lowerKeyword = keyword.toLowerCase();
        const variations = new Map([
            ['томат (помидор)', ['томат', 'помидор', 'томатная паста', 'томатный соус']],
            ['картошка', ['картошка', 'potato']],
        ]);
        const keywordVariations = variations.get(lowerKeyword);
        if (keywordVariations) {
            return keywordVariations.some((variant) => lowerText.includes(variant));
        }

        return lowerText.includes(lowerKeyword);
    });
};

export const useFilteredData = (data: Recipe[] | null = null) => {
    const searchText = useAppSelector(searchTextSelector);
    const {
        allergens,
        meatTypes,
        sideDishes,
        authors,
        category: allCategories,
    } = useAppSelector(selectAppliedFilters);

    const filterAllergens = useAppSelector(selectFilterAllergens);

    const baseData = data?.length ? data : recipes;

    return useMemo(() => {
        const textFilteredData = searchText
            ? baseData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
            : baseData;

        return textFilteredData.filter((item) => {
            if (
                !isArrayWithItems(allergens) &&
                !isArrayWithItems(meatTypes) &&
                !isArrayWithItems(sideDishes) &&
                !isArrayWithItems(authors) &&
                !isArrayWithItems(allCategories)
            ) {
                return true;
            }

            const matchesAllergens =
                !isArrayWithItems(allergens) ||
                !allergens.some((allergen) =>
                    item.ingredients.some((ing) => containsKeyword(ing.title, [allergen])),
                );

            const matchesMeatType =
                !isArrayWithItems(meatTypes) ||
                (item.meat &&
                    meatTypes.some((type) =>
                        item.meat?.toLowerCase().includes(type.toLowerCase()),
                    ));

            const matchesSideDish =
                !isArrayWithItems(sideDishes) ||
                (item.side && sideDishes.some((side) => containsKeyword(item.side!, [side])));

            const matchesAuthor =
                !isArrayWithItems(authors) ||
                (item.author &&
                    authors.some((author) =>
                        item.author?.toLowerCase().includes(author.toLowerCase()),
                    ));

            const itemCategories = item.category.map((cat) => categoryMap[cat as Category].label);
            const matchesCategory =
                !isArrayWithItems(allCategories) ||
                allCategories.some((category) => itemCategories.includes(category));

            return (
                matchesAllergens &&
                matchesMeatType &&
                matchesSideDish &&
                matchesAuthor &&
                matchesCategory
            );
        });
    }, [
        baseData,
        searchText,
        allergens,
        meatTypes,
        sideDishes,
        authors,
        filterAllergens,
        allCategories,
    ]);
};
