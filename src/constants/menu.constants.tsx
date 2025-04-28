import { CategoryType, SubCategoryType } from '~/shared/types/navigation.types';

import beveragesIcon from '../assets/icons/beverages.svg';
import childTastyIcon from '../assets/icons/child-tasty.svg';
import dessertsIcon from '../assets/icons/desserts.svg';
import firstOursesIcon from '../assets/icons/first-ourses.svg';
import fryingPanIcon from '../assets/icons/frying-pan.svg';
import grillIcon from '../assets/icons/grill.svg';
import healthyIcon from '../assets/icons/healthy-eating.svg';
import internationalIcon from '../assets/icons/international.svg';
import preserves from '../assets/icons/preserves.svg';
import saladIcon from '../assets/icons/salad.svg';
import saucesIcon from '../assets/icons/sauces.svg';
import veganIcon from '../assets/icons/vegan.svg';

export enum Category {
    Salads = 'salads',
    Snacks = 'snacks',
    FirstCourses = 'first-dish',
    SecondCourses = 'second-dish',
    Desserts = 'desserts',
    Grill = 'grill',
    Vegan = 'vegan',
    Kids = 'kids',
    Healthy = 'healthy',
    National = 'national',
    Sauces = 'sauces',
    Beverages = 'beverages',
    Preserves = 'preserves',
}

export const categoryMap: CategoryType = {
    [Category.Salads]: { label: 'Салаты', icon: saladIcon, route: 'salads' },
    [Category.Snacks]: { label: 'Закуски', icon: healthyIcon, route: 'snacks' },
    [Category.FirstCourses]: { label: 'Первые блюда', icon: firstOursesIcon, route: 'first-dish' },
    [Category.SecondCourses]: { label: 'Вторые блюда', icon: fryingPanIcon, route: 'second-dish' },
    [Category.Desserts]: { label: 'Десерты, выпечка', icon: dessertsIcon, route: 'desserts' },
    [Category.Grill]: { label: 'Блюда на гриле', icon: grillIcon, route: 'grill' },
    [Category.Vegan]: {
        label: 'Веганская кухня',
        icon: veganIcon,
        route: 'vegan',
    },
    [Category.Kids]: { label: 'Детские блюда', icon: childTastyIcon, route: 'kids' },
    [Category.Healthy]: { label: 'Лечебное питание', icon: healthyIcon, route: 'healthy' },
    [Category.National]: { label: 'Национальные', icon: internationalIcon, route: 'national' },
    [Category.Sauces]: { label: 'Соусы', icon: saucesIcon, route: 'sauces' },
    [Category.Beverages]: { label: 'Напитки', icon: beveragesIcon, route: 'beverages' },
    [Category.Preserves]: { label: 'Заготовки', icon: preserves, route: 'preserves' },
};

export const subMenus: SubCategoryType = {
    [Category.Salads]: [
        { title: 'Мясные салаты', route: 'meat', id: 0 },
        { title: 'Рыбные салаты', route: 'fish', id: 1 },
        { title: 'Овощные салаты', route: 'vegetable', id: 2 },
        { title: 'Теплые салаты', route: 'warm', id: 3 },
    ],
    [Category.Snacks]: [
        { title: 'Мясные закуски', route: 'meat', id: 0 },
        { title: 'Рыбные закуски', route: 'fish', id: 1 },
        { title: 'Овощные закуски', route: 'vegetable', id: 2 },
        { title: 'Теплые закуски', route: 'warm', id: 3 },
        { title: 'Бутерброды', route: 'sandwiches', id: 4 },
        { title: 'Фастфуд', route: 'fastfood', id: 5 },
    ],
    [Category.FirstCourses]: [
        { title: 'Мясные супы', route: 'meat', id: 0 },
        { title: 'Овощные супы', route: 'vegetable', id: 1 },
        { title: 'Бульоны', route: 'broths', id: 2 },
        { title: 'Холодные супы', route: 'cold', id: 3 },
        { title: 'Диетические супы', route: 'dietary', id: 4 },
    ],
    [Category.SecondCourses]: [
        { title: 'Мясные', route: 'poultry-dish', id: 0 },
        { title: 'Рыбные', route: 'fish', id: 1 },
        { title: 'Овощные', route: 'vegetable', id: 2 },
        { title: 'Из птицы', route: 'poultry', id: 3 },
        { title: 'Из грибов', route: 'mushrooms', id: 4 },
        { title: 'Из субпродуктов', route: 'offal', id: 5 },
        { title: 'На пару', route: 'steamed', id: 6 },
        { title: 'Пельмени, вареники', route: 'dumplings', id: 7 },
        { title: 'Мучные гарниры', route: 'flour-side', id: 8 },
        { title: 'Овощные гарниры', route: 'vegetable-side', id: 9 },
        { title: 'Пицца', route: 'pizza', id: 10 },
        { title: 'Суши', route: 'sushi', id: 11 },
    ],
    [Category.Vegan]: [
        { title: 'Закуски', route: 'snacks', id: 0 },
        { title: 'Первые блюда', route: 'first', id: 1 },
        { title: 'Вторые блюда', route: 'second-dish', id: 2 },
        { title: 'Гарниры', route: 'side', id: 3 },
        { title: 'Десерты', route: 'desserts', id: 4 },
        { title: 'Выпечка', route: 'bakery', id: 5 },
        { title: 'Сыроедческие блюда', route: 'raw', id: 6 },
        { title: 'Напитки', route: 'drinks', id: 7 },
    ],
};

export const menuItems = Object.values(Category).map((categoryId) => ({
    id: categoryId,
    label: categoryMap[categoryId].label,
    icon: categoryMap[categoryId].icon,
    route: categoryMap[categoryId].route,
    subItems: subMenus[categoryId],
}));

export const TRUNCATE_STYLES = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
};
