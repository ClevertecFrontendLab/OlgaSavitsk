import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCategories } from '~/store/category-slice';

import { getCategoryRoute, getCurrentCategories } from '../utils/category';

const useDishNavigation = (categoriesIds: string[], _id: string) => {
    const { categories } = useSelector(selectCategories);
    const navigate = useNavigate();

    const currentCategories = useMemo(
        () => getCurrentCategories(categories, categoriesIds),
        [categories, categoriesIds],
    );

    const handleRecipeClick = () => {
        const categoryRoute = getCategoryRoute(currentCategories, _id);
        if (categoryRoute) {
            navigate(categoryRoute);
        }
    };

    return { currentCategories, handleRecipeClick };
};

export default useDishNavigation;
