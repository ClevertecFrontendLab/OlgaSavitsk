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

export type Recipe = {
    id: string;
    title: string;
    description: string;
    category: string[];
    image: string;
    bookmarks?: number;
    likes?: number;
    time: string;
    portions: number;
    nutritionValue: Record<NutritionKey, number>;
    ingredients: Ingredient[];
    steps: RecipeStep[];
};
