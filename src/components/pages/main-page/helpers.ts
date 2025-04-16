import avatar from '~/assets/images/avatar.png';
import avatar2 from '~/assets/images/avatar2.png';
import avatar3 from '~/assets/images/avatar3.png';
import recipe1 from '~/assets/images/recipe1.png';
import recipe2 from '~/assets/images/recipe2.png';
import recipe3 from '~/assets/images/recipe3.png';
import recipe4 from '~/assets/images/recipe4.png';
import recipe5 from '~/assets/images/recipe5.png';
import recipe6 from '~/assets/images/recipe6.png';
import recipe7 from '~/assets/images/recipe7.png';
import recipe8 from '~/assets/images/recipe8.png';
import { Category } from '~/constants/menu.constants';
import { Blog, SliderType } from '~/shared/types/page-config.types';

export const sliders: Array<SliderType> = [
    {
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: Category.FirstCourses,
        image: recipe1,
        heartCount: 1,
    },
    {
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        category: Category.Vegan,
        image: recipe2,
        heartCount: 2,
        peopleCount: 1,
    },
    {
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: Category.Desserts,
        image: recipe3,
        peopleCount: 1,
    },
    {
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        category: Category.Salads,
        image: recipe4,
        peopleCount: 1,
    },
    {
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        category: Category.Salads,
        image: recipe4,
        peopleCount: 1,
    },
];

export const recipies = [
    {
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: Category.SecondCourses,
        image: recipe5,
        heartCount: 85,
        peopleCount: 152,
    },
    {
        title: 'Пряная ветчина по итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: Category.SecondCourses,
        image: recipe6,
        heartCount: 159,
        peopleCount: 257,
        recommended: {
            name: 'Елена Высоцкая',
            avatar: avatar2,
        },
    },
    {
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: Category.SecondCourses,
        image: recipe7,
        heartCount: 258,
        peopleCount: 342,
        recommended: {
            name: 'Елена Высоцкая',
            avatar: avatar3,
        },
    },
    {
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: Category.National,
        image: recipe8,
        heartCount: 124,
        peopleCount: 324,
    },
];

export const blogPosts: Array<Blog> = [
    {
        id: 1,
        name: 'Елена Высоцкая',
        username: '@elenapower',
        avatar: avatar2,
        content:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        id: 2,
        name: 'Alex Cook',
        username: '@funfastcooking',
        avatar: avatar3,
        content:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        id: 3,
        name: 'Екатерина Константинопольская',
        username: '@bake_and_pie',
        avatar: avatar,
        content:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
];

export const additionalInfo = {
    recipies: [
        {
            title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
            content:
                'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
            favorites: 1,
            likes: 1,
            category: Category.SecondCourses,
        },
        {
            title: 'Капустные котлеты',
            content:
                'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
            favorites: 2,
            likes: 1,
            category: Category.SecondCourses,
        },
    ],
    additionalRecipes: [
        { title: 'Стейк для вегетарианцев', category: Category.SecondCourses },
        { title: 'Котлеты из гречки и фасоли', category: Category.SecondCourses },
        { title: 'Сырный суп с лапшой и брокколи', category: Category.FirstCourses },
    ],
};
