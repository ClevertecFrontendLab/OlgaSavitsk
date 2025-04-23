import { Box, Flex, Stat, StatGroup, StatLabel, StatNumber, Text } from '@chakra-ui/react';

import { NutritionKey } from '~/shared/types/recipe.types';

import { NUTRITION_INFO } from '../constants';

interface RecipeNutritionProps {
    nutritionValue: Record<NutritionKey, number>;
}

export const RecipeNutrition = ({ nutritionValue }: RecipeNutritionProps) => (
    <Box w='full'>
        <Text fontSize='sm' mb={4} color='blackAlpha.800'>
            * Калорийность на 1 порцию
        </Text>
        <StatGroup
            display='grid'
            gridTemplateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
            gap={{ base: 3, '2xl': 6 }}
            pt={2}
        >
            {(Object.keys(nutritionValue) as NutritionKey[]).map((key) => (
                <Stat
                    key={key}
                    borderWidth={1}
                    borderColor='gray.200'
                    borderRadius='2xl'
                    textAlign='center'
                    p={4}
                >
                    <Flex
                        direction={{ base: 'row', md: 'column' }}
                        align='center'
                        justify='space-between'
                    >
                        <StatLabel
                            color='blackAlpha.600'
                            textAlign={{ base: 'left', md: 'center' }}
                            flex={1}
                        >
                            {NUTRITION_INFO[key].name}
                        </StatLabel>
                        <StatNumber
                            color='lime.800'
                            fontSize={{ base: '2xl', sm: '4xl' }}
                            textAlign={{ base: 'right', md: 'center' }}
                            flex={1}
                        >
                            {nutritionValue[key]}
                        </StatNumber>
                        <StatLabel fontSize={{ base: 'xs', sm: 'sm' }} fontWeight={600} flex={1}>
                            {NUTRITION_INFO[key].unit}
                        </StatLabel>
                    </Flex>
                </Stat>
            ))}
        </StatGroup>
    </Box>
);
