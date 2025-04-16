import recipe5 from '~/assets/images/recipe5.png';
import recipe6 from '~/assets/images/recipe6.png';
import recipe7 from '~/assets/images/recipe7.png';
import recipe8 from '~/assets/images/recipe8.png';
import recipe9 from '~/assets/images/recipe9.png';
import recipe10 from '~/assets/images/recipe10.png';
import { Category } from '~/constants/menu.constants';

export type Recipie = {
    title: string;
    description: string;
    category: string;
    image: string;
    heartCount?: number;
    peopleCount?: number;
    recommended?: {
        name: string;
        avatar: string;
    };
};

export type AdditionalRecipieInfo = {
    recipies: {
        title: string;
        content: string;
        favorites: number;
        likes: number;
        category: Category;
    }[];
    additionalRecipes: {
        title: string;
        category: Category;
    }[];
};

export const recipies = [
    {
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        category: Category.National,
        image: recipe9,
        heartCount: 85,
        peopleCount: 152,
    },
    {
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',
        category: Category.Kids,
        image: recipe10,
        heartCount: 85,
        peopleCount: 152,
    },
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
    },
    {
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: Category.SecondCourses,
        image: recipe7,
        heartCount: 258,
        peopleCount: 342,
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
    {
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        category: Category.National,
        image: recipe8,
        heartCount: 124,
        peopleCount: 324,
    },
    {
        title: 'Пури',
        description:
            'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.',
        category: Category.National,
        image: recipe7,
        heartCount: 124,
        peopleCount: 324,
    },
];

export const additionalInfo = {
    recipies: [
        {
            title: 'Бананово-молочное желе',
            content:
                'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
            favorites: 1,
            likes: 1,
            category: Category.Kids,
        },
        {
            title: 'Нежный сливочно-сырный крем для кексов',
            content:
                'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
            favorites: 2,
            likes: 1,
            category: Category.Kids,
        },
    ],
    additionalRecipes: [
        { title: 'Домашние сырные палочки', category: Category.Kids },
        { title: 'Панкейки', category: Category.National },
        { title: 'Воздушное банановое печенье на сковороде', category: Category.Vegan },
    ],
};
