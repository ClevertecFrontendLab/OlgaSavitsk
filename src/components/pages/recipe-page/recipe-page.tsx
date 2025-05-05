import { Container, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { Slider } from '~/widgets/slider/slider';

import { RecipeAuthor } from './components/recipe-author';
import { RecipeHeader } from './components/recipe-header';
import { RecipeIngredients } from './components/recipe-ingredients';
import { RecipeNutrition } from './components/recipe-nutrition';
import { RecipeSteps } from './components/recipe-steps';

export const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isError } = useGetRecipeByIdQuery(id || '', {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isError) {
            setTimeout(() => {
                navigate(-1);
            }, 500);
        }
    }, [isError, navigate]);

    if (!data) {
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
                <RecipeHeader recipe={data} />
                <VStack w={{ base: 'full', md: 'full', lg: 578, '2xl': 668 }}>
                    <RecipeNutrition nutritionValue={data.nutritionValue} />
                    <VStack
                        maxW={{ base: 'full', md: 608, lg: 578, '2xl': 668 }}
                        gap={{ base: 6, lg: 10 }}
                    >
                        <RecipeIngredients recipe={data} />
                        <RecipeSteps steps={data.steps} />
                        <RecipeAuthor />
                    </VStack>
                </VStack>
            </Container>
            <Slider />
        </>
    );
};
