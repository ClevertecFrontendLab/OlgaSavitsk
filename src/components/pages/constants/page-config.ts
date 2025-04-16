import { Category, subMenus } from '~/constants/menu.constants';
import { PageConfig } from '~/shared/types/page-config.types';

import { additionalInfo, recipies } from '../category-page/helpers';

export const veganPageConfig: PageConfig = {
    path: '/vegan',
    title: 'Веганская кухня',
    subTitle:
        'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.',
    subMenus: subMenus[Category.Vegan],
    recipes: recipies,
    additionalInfo: {
        title: 'Десерты, выпечка',
        description:
            'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.',
        recipes: additionalInfo,
    },
};
