import { SubCategory } from './category.types';
import { Recipe } from './recipe.types';

export type AdditionalInfo = {
    title?: string;
    description?: string;
    recipes?: Recipe[];
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
