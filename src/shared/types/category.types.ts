export type CategoryItem = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
};

export type SubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};
