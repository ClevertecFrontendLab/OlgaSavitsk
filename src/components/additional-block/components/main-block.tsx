import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';

import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';
import { TRUNCATE_STYLES } from '~/constants/menu.constants';
import { CustomTag } from '~/shared/components/custom-tag/custom-tag';
import { StatBadge } from '~/shared/components/stat-bage/stat-bage';
import useDishNavigation from '~/shared/hooks/category.hook';
import { Recipe } from '~/shared/types/recipe.types';

export const MainRecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const { currentCategories } = useDishNavigation(recipe.categoriesIds);
    const truncateStyles = useBreakpointValue({
        base: TRUNCATE_STYLES,
        md: TRUNCATE_STYLES,
    });

    return (
        <Card
            h='100%'
            borderRadius='lg'
            variant='outline'
            flex={1}
            p={{ base: 3, lg: 4, '2xl': 6 }}
        >
            <CardBody p={0}>
                <Heading
                    as='h4'
                    size={{ base: 'sm', md: 'sm', lg: 'md' }}
                    noOfLines={1}
                    sx={truncateStyles}
                >
                    {recipe.title}
                </Heading>
                <Text
                    fontSize='sm'
                    noOfLines={3}
                    letterSpacing={0.6}
                    pt={{ base: 2, md: 2, lg: 3 }}
                    lineHeight={1.43}
                >
                    {recipe.description}
                </Text>
            </CardBody>

            <CardFooter justify='space-between' flexWrap='nowrap' p={0} pt={6}>
                <VStack>
                    {currentCategories.map((category, idx) => (
                        <CustomTag key={idx} category={category} color='lime.50' />
                    ))}
                </VStack>
                <HStack spacing={4}>
                    <StatBadge fontSize='sm' icon={heartIcon} count={recipe.bookmarks} />
                    <StatBadge fontSize='sm' icon={peopleIcon} count={recipe.likes} />
                </HStack>
            </CardFooter>
        </Card>
    );
};
