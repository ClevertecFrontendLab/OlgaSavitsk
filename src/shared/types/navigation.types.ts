export type CategoryItem = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
};

export type SubCategory = {
    title: string;
    category: string;
    rootCategoryId: string;
};

export type Recipe = {
    _id: string;
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    authorData: AuthorData;
};

export type Step = {
    stepNumber: number;
    description: string;
    image: string;
};

export type NutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type AuthorData = {
    login: string;
    firstName: string;
    lastName: string;
    subscribers: string[];
};
