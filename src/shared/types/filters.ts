export enum FilterType {
    MEAT = 'meat',
    SIDE_DISH = 'sideDish',
    ALLERGEN = 'allergen',
    AUTHOR = 'author',
    CATEGORY = 'category',
}

export type Option = {
    label: string;
    value: string;
};
