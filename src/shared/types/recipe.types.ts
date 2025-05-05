export type NutritionKey = 'calories' | 'protein' | 'fats' | 'carbohydrates';

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

export type ApiResponse<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export type RecipeParams = Partial<{
    page: number;
    limit: number;
    allergens: string[];
    searchString: string;
    meat: string[];
    garnish: string[];
    subcategoriesIds: string[];
    sortBy: 'createdAt' | 'likes';
    sortOrder: 'asc' | 'desc';
}>;
