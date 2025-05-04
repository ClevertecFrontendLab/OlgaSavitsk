import { AdditionalRecipieInfo } from '~/components/pages/category-page/helpers';

import { SubCategory } from './navigation.types';
import { Recipe } from './recipe.types';

export type AdditionalInfo = {
    title: string;
    description: string;
    recipes: AdditionalRecipieInfo;
};

export type PageConfig = {
    path: string;
    title: string;
    subTitle: string;
    subMenus?: SubCategory[];
    recipes: Recipe[];
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
