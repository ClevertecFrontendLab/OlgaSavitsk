import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCategories } from '~/store/category-slice';

import { getCategoryRoute, getCurrentCategories } from '../utils/category';

const useDishNavigation = (categoriesIds: string[], id?: string) => {
    const { categories } = useSelector(selectCategories);
    const navigate = useNavigate();

    const currentCategories = getCurrentCategories(categories, categoriesIds);

    const handleRecipeClick = () => {
        const categoryRoute = getCategoryRoute(currentCategories, id!);
        if (categoryRoute) {
            navigate(categoryRoute);
        }
    };

    return { currentCategories, handleRecipeClick };
};

export default useDishNavigation;
