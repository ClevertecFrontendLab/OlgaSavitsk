import { NutritionKey } from '~/shared/types/recipe.types';

export const NUTRITION_INFO: Record<NutritionKey, { name: string; unit: string }> = {
    calories: { name: 'калорийность', unit: 'ККАЛ' },
    proteins: { name: 'белки', unit: 'ГРАММ' },
    fats: { name: 'жиры', unit: 'ГРАММ' },
    carbohydrates: { name: 'углеводы', unit: 'ГРАММ' },
};
