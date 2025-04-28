export type NutritionKey = 'calories' | 'proteins' | 'fats' | 'carbohydrates';

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type RecommendedInfo = {
    name: string;
    avatar: string;
};

export type Recipe = {
    id: string;
    title: string;
    description: string;
    category: string[];
    image: string;
    time: string;
    portions: number;
    nutritionValue: Record<NutritionKey, number>;
    ingredients: Ingredient[];
    bookmarks?: number;
    steps: RecipeStep[];
    subcategory?: string[];
    likes?: number;
    meat?: string;
    side?: string;
    author?: string;
    recommended?: RecommendedInfo;
};
