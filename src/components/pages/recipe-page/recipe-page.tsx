import { Container, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { recipes } from '~/shared/mock-data/recipes';
import { Slider } from '~/widgets/slider/ui/slider';

import { RecipeAuthor } from './components/recipe-author';
import { RecipeHeader } from './components/recipe-header';
import { RecipeIngredients } from './components/recipe-ingredients';
import { RecipeNutrition } from './components/recipe-nutrition';
import { RecipeSteps } from './components/recipe-steps';

export const RecipePage = () => {
    const { id } = useParams();
    const config = recipes.find((recipe) => recipe.id === id);

    if (!config) {
        return <div>Category not found</div>;
    }

    return (
        <>
            <Container
                maxW='full'
                pt={{ base: 4, lg: 6 }}
                pb={14}
                px={0}
                gap={{ base: 6, lg: 10 }}
                centerContent
            >
                <RecipeHeader recipe={config} />
                <VStack w={{ base: 'full', md: 'full', lg: 578, '2xl': 668 }}>
                    <RecipeNutrition nutritionValue={config.nutritionValue} />
                    <VStack
                        maxW={{ base: 'full', md: 608, lg: 578, '2xl': 668 }}
                        gap={{ base: 6, lg: 10 }}
                    >
                        <RecipeIngredients recipe={config} />
                        <RecipeSteps steps={config.steps} />
                        <RecipeAuthor />
                    </VStack>
                </VStack>
            </Container>
            <Slider />
        </>
    );
};
