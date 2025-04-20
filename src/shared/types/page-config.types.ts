import { AdditionalRecipieInfo, Recipie } from '~/components/pages/category-page/helpers';
import { Category } from '~/constants/menu.constants';

import { SubCategoryType } from './navigation.types';

export type AdditionalInfo = {
    title: string;
    description: string;
    recipes: AdditionalRecipieInfo;
};

export type PageConfig = {
    path: string;
    title: string;
    subTitle: string;
    subMenus?: SubCategoryType[Category];
    recipes: Recipie[];
    additionalInfo: AdditionalInfo;
};

export type Blog = {
    id?: number;
    name: string;
    avatar: string;
    username?: string;
    content?: string;
};

export type SliderType = {
    id: string;
    title: string;
    description: string;
    category: Array<string>;
    subcategory: Array<string>;
    image: string;
    bookmarks?: number;
    likes?: number;
};
