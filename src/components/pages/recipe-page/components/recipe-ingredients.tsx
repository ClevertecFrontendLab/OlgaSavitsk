import {
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Ingredient, Recipe } from '~/shared/types/recipe.types';

interface RecipeIngredientsProps {
    recipe: Recipe;
}

export const RecipeIngredients = ({ recipe }: RecipeIngredientsProps) => {
    const { ingredients, portions } = recipe;
    const [selectedPortions, setSelectedPortions] = useState(portions);

    const handlePortionsChange = (value: string) => {
        setSelectedPortions(Number(value));
    };
    return (
        <TableContainer pt={{ base: 4, lg: 8 }} w='full'>
            <Table variant='striped' colorScheme='blackAlpha' size={{ base: 'xl', lg: 'md' }}>
                <Thead>
                    <Tr>
                        <Th color='lime.600' fontWeight={600} fontSize={{ base: 'xs', lg: 'lg' }}>
                            Ингредиенты
                        </Th>
                        <Th paddingInline={0}>
                            <HStack justify='end'>
                                <Text
                                    color='lime.600'
                                    fontWeight={600}
                                    fontSize={{ base: 'xs', lg: 'lg' }}
                                >
                                    порций
                                </Text>
                                <NumberInput
                                    size='md'
                                    min={1}
                                    maxW={90}
                                    value={selectedPortions}
                                    onChange={handlePortionsChange}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </HStack>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map(({ title, count, measureUnit }: Ingredient) => (
                        <Tr key={title}>
                            <Td fontSize='sm' fontWeight={500}>
                                {title}
                            </Td>
                            <Td textAlign='end'>
                                {((parseInt(count) * selectedPortions) / portions).toFixed(2)}{' '}
                                {measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
