import { Box, Heading, SimpleGrid, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { AdditionalInfo } from '~/shared/types/page-config.types';
import { isArrayWithItems } from '~/shared/utils/common';

import { MainRecipeCard } from './components/main-block';
import { SideRecipeCard } from './components/side-block';

export const AdditionalBlock: FC<AdditionalInfo> = ({ title, description, recipes }) => {
    const titleSize = useBreakpointValue({ base: 'lg', md: 'lg', lg: 'xl', '2xl': '2xl' });
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const mainRecipes = isArrayWithItems(recipes) ? recipes.slice(0, 2) : [];
    const sideRecipes = isArrayWithItems(recipes) ? recipes.slice(2, 5) : [];

    return (
        <SimpleGrid
            columns={{ base: 1, md: 3, xl: 3, '2xl': 4 }}
            spacing={{ base: 3, md: 3, lg: 4, '2xl': 6 }}
        >
            <Box gridColumn={{ base: 'span 1', md: 'span 3', lg: 'span 1', '2xl': 'span 2' }}>
                <Heading as='h2' size={titleSize} pt={{ base: 0, lg: 6 }}>
                    {title}
                </Heading>
            </Box>
            <Box gridColumn={{ base: 'span 1', md: 'span 3', lg: 'span 2', '2xl': 'span 2' }}>
                <Text
                    color='blackAlpha.600'
                    letterSpacing={isMobile ? 0 : 0.9}
                    pt={{ base: 0, lg: 8 }}
                >
                    {description}
                </Text>
            </Box>

            <Box
                display='flex'
                flexDirection={{ base: 'column', sm: 'row' }}
                gap={{ base: 3, md: 3, lg: 4, '2xl': 6 }}
                gridColumn={{ base: 'span 1', md: 'span 2', xl: 'span 2', '2xl': 'span 2' }}
            >
                {mainRecipes.map((recipe, index) => (
                    <MainRecipeCard key={index} recipe={recipe} />
                ))}
            </Box>
            <VStack
                align='stretch'
                spacing={{ base: 2, lg: 3 }}
                gridColumn={{ base: 'span 1', md: 'span 1', xl: 'span 1', '2xl': 'span 2' }}
            >
                {sideRecipes.map((recipe, index) => (
                    <SideRecipeCard key={index} recipe={recipe} />
                ))}
            </VStack>
        </SimpleGrid>
    );
};
