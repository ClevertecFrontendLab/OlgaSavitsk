import { Category, subMenus } from '~/constants/menu.constants';
import { recipes } from '~/shared/mock-data/recipes';
import { PageConfig } from '~/shared/types/page-config.types';

import { additionalInfo } from '../category-page/helpers';

type PageConfigType = {
    [key in Category]?: PageConfig;
};

export const pageConfig: PageConfigType = {
    [Category.Vegan]: {
        path: '/vegan',
        title: 'Веганская кухня',
        subTitle:
            'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.',
        subMenus: subMenus[Category.Vegan],
        recipes: recipes.filter((recipe) => recipe.category.includes(Category.Vegan)),
        additionalInfo: {
            title: 'Десерты, выпечка',
            description:
                'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.',
            recipes: additionalInfo,
        },
    },
};
