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
import { DATA_TEST_ID } from './data-test-id';

export enum Category {
    Salads = '1',
    Snacks = '2',
    FirstCourses = '3',
    SecondCourses = '4',
    Desserts = '5',
    Grill = '6',
    Vegan = '7',
    Kids = '8',
    Healthy = '9',
    National = '10',
    Sauces = '11',
    Beverages = '12',
    Preserves = '13',
}

type CategoryType = {
    [key in Category]: {
        label: string;
        icon: string;
        route?: string;
        dataTestId?: string;
    };
};

type SubCategoryType = {
    [key in Category]?: {
        title: string;
        route: string;
    }[];
};

export const categoryMap: CategoryType = {
    [Category.Salads]: { label: 'Салаты', icon: saladIcon },
    [Category.Snacks]: { label: 'Закуски', icon: healthyIcon },
    [Category.FirstCourses]: { label: 'Первые блюда', icon: firstOursesIcon },
    [Category.SecondCourses]: { label: 'Вторые блюда', icon: fryingPanIcon },
    [Category.Desserts]: { label: 'Десерты, выпечка', icon: dessertsIcon },
    [Category.Grill]: { label: 'Блюда на гриле', icon: grillIcon },
    [Category.Vegan]: {
        label: 'Веганская кухня',
        icon: veganIcon,
        route: '/vegan',
        dataTestId: DATA_TEST_ID.veganCuisine,
    },
    [Category.Kids]: { label: 'Детские блюда', icon: childTastyIcon },
    [Category.Healthy]: { label: 'Лечебное питание', icon: healthyIcon },
    [Category.National]: { label: 'Национальные', icon: internationalIcon },
    [Category.Sauces]: { label: 'Соусы', icon: saucesIcon },
    [Category.Beverages]: { label: 'Напитки', icon: beveragesIcon },
    [Category.Preserves]: { label: 'Заготовки', icon: preserves },
};

export const subMenus: SubCategoryType = {
    [Category.Salads]: [
        { title: 'Мясные салаты', route: '0' },
        { title: 'Рыбные салаты', route: '1' },
        { title: 'Овощные салаты', route: '2' },
        { title: 'Теплые салаты', route: '3' },
    ],
    [Category.Snacks]: [
        { title: 'Мясные закуски', route: '0' },
        { title: 'Рыбные закуски', route: '1' },
        { title: 'Овощные закуски', route: '2' },
        { title: 'Теплые закуски', route: '3' },
        { title: 'Бутерброды', route: '4' },
        { title: 'Фастфуд', route: '5' },
    ],
    [Category.FirstCourses]: [
        { title: 'Мясные супы', route: '0' },
        { title: 'Овощные супы', route: '1' },
        { title: 'Бульоны', route: '2' },
        { title: 'Холодные супы', route: '3' },
        { title: 'Диетические супы', route: '4' },
    ],
    [Category.SecondCourses]: [
        { title: 'Мясные', route: '0' },
        { title: 'Рыбные', route: '1' },
        { title: 'Овощные', route: '2' },
        { title: 'Из птицы', route: '3' },
        { title: 'Из грибов', route: '4' },
        { title: 'Из субпродуктов', route: '5' },
        { title: 'На пару', route: '6' },
        { title: 'Пельмени, вареники', route: '7' },
        { title: 'Мучные гарниры', route: '8' },
        { title: 'Овощные гарниры', route: '9' },
        { title: 'Пицца', route: '10' },
        { title: 'Суши', route: '11' },
    ],
    [Category.Vegan]: [
        { title: 'Закуски', route: '0' },
        { title: 'Первые блюда', route: '1' },
        { title: 'Вторые блюда', route: '2' },
        { title: 'Гарниры', route: '3' },
        { title: 'Десерты', route: '4' },
        { title: 'Выпечка', route: '5' },
        { title: 'Сыроедческие блюда', route: '6' },
        { title: 'Напитки', route: '7' },
    ],
};

export const menuItems = Object.values(Category).map((categoryId) => ({
    id: categoryId,
    label: categoryMap[categoryId].label,
    icon: categoryMap[categoryId].icon,
    route: categoryMap[categoryId].route,
    dataTestId: categoryMap[categoryId].dataTestId,
    subItems: subMenus[categoryId],
}));

export const TRUNCATE_STYLES = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'auto',
    display: 'block',
};
