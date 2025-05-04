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

export const categoryMap = {
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

export const TRUNCATE_STYLES = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
};
