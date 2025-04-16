import { Category } from '~/constants/menu.constants';

export type CategoryType = {
    [key in Category]: {
        label: string;
        icon: string;
        route?: string;
        dataTestId?: string;
    };
};

export type SubCategoryType = {
    [key in Category]?: {
        title: string;
        route: string;
    }[];
};
