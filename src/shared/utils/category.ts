import { CategoryItem } from '../types/category.types';

export const getRandomCategory = (categories: CategoryItem[] | undefined) => {
    if (!categories?.length) return;
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
};

export const getCurrentCategories = (
    categories: CategoryItem[],
    categoriesIds?: string[] | null,
): CategoryItem[] => {
    if (!categories?.length || !categoriesIds?.length) return [];
    return categories.filter((category) =>
        category.subCategories?.some((subCategory) => categoriesIds.includes(subCategory._id)),
    );
};

export const getCategoryRoute = (currentCategories: CategoryItem[], recipeId: string) => {
    if (currentCategories.length > 0) {
        const categoryRoute = currentCategories[0].category;
        const subCategory = currentCategories[0].subCategories[0].category;
        return `/${categoryRoute}/${subCategory}/${recipeId}`;
    }
};
