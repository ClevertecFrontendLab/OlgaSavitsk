import { Button, Card, CardBody, Heading, HStack, useBreakpointValue } from '@chakra-ui/react';

import { TRUNCATE_STYLES } from '~/constants/menu.constants';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';
import useDishNavigation from '~/shared/hooks/category.hook';
import { Recipe } from '~/shared/types/recipe.types';

export const SideRecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const { currentCategories } = useDishNavigation(recipe.categoriesIds);
    const truncateStyles = useBreakpointValue({
        base: TRUNCATE_STYLES,
        md: TRUNCATE_STYLES,
    });

    return (
        <Card borderRadius='lg' variant='outline'>
            <CardBody px={{ base: 3, md: 3, lg: 4, '2xl': 6 }} py={{ base: 2, md: 2, lg: 2 }}>
                <HStack>
                    {currentCategories[0] && (
                        <CustomIcon icon={currentCategories[0].icon} boxSize='24px' />
                    )}
                    <Heading
                        as='h4'
                        size={{ base: 'sm', md: 'sm', lg: '18px', '2xl': 'md' }}
                        noOfLines={1}
                        flex={2}
                        sx={truncateStyles}
                    >
                        {recipe.title}
                    </Heading>
                    <Button
                        size='sm'
                        variant='outline'
                        colorScheme='lime'
                        fontSize={{ base: 12, md: 12, '2xl': 16 }}
                        w={{ base: 70, '2xl': 87 }}
                    >
                        Готовить
                    </Button>
                </HStack>
            </CardBody>
        </Card>
    );
};
