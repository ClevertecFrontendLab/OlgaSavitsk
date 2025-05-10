import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    IconButton,
    Image,
    Show,
    Spacer,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FC } from 'react';

import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';
import { CustomTag } from '~/shared/components/custom-tag/custom-tag';
import { StatBadge } from '~/shared/components/stat-bage/stat-bage';
import useDishNavigation from '~/shared/hooks/category.hook';
import { Recipe } from '~/shared/types/recipe.types';
import { isArrayWithItems } from '~/shared/utils/common';
import { searchTextSelector } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';

import { HighlightText } from '../filter/components/highlight-text';

type DishCardProps = Recipe & { dataTestId?: number };

export const DishCard: FC<DishCardProps> = ({
    _id,
    title,
    description,
    categoriesIds,
    image,
    bookmarks,
    likes,
    dataTestId,
}) => {
    const searchText = useAppSelector(searchTextSelector);
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const { currentCategories, handleRecipeClick } = useDishNavigation(categoriesIds, _id);

    return (
        <Card
            direction='row'
            borderRadius='lg'
            overflow='hidden'
            variant='outline'
            maxW={{ base: '100%', md: 356, lg: '100%', '2xl': 668 }}
            w='full'
            data-test-id={`food-card-${dataTestId}`}
        >
            <Image
                objectFit='cover'
                src={image}
                maxW={{ base: '158px', md: '158px', lg: '346px' }}
                h={{ base: 128, md: 128, lg: 244 }}
                w='full'
                alt='recipe'
            />

            <Show above='lg'>
                <CustomTag blog={null} color='lime.150' position='absolute' />
            </Show>
            <Stack w='full' spacing={{ md: 0 }}>
                <CardHeader py={{ base: 2, md: 2, lg: 4 }} px={isMobile ? 2 : 6}>
                    <Flex>
                        <Flex
                            flexDirection={isMobile ? 'column' : 'row'}
                            wrap='wrap'
                            position={isMobile ? 'absolute' : 'static'}
                            left={1}
                            gap={1}
                        >
                            {isArrayWithItems(currentCategories) &&
                                currentCategories.map((category, index) => (
                                    <CustomTag key={index} category={category} color='lime.50' />
                                ))}
                        </Flex>

                        {!isMobile && <Spacer />}
                        <HStack spacing={{ base: 6, md: 2, lg: 6 }}>
                            {bookmarks && (
                                <StatBadge fontSize='xs' icon={heartIcon} count={bookmarks} />
                            )}
                            {likes && <StatBadge fontSize='xs' icon={peopleIcon} count={likes} />}
                        </HStack>
                    </Flex>
                </CardHeader>
                <CardBody py={0} px={isMobile ? 2 : 6} lineHeight={1}>
                    <HighlightText title={title} searchText={searchText} />

                    {!isMobile && (
                        <Text fontSize='sm' noOfLines={3} letterSpacing={0.6} pt={3}>
                            {description}
                        </Text>
                    )}
                </CardBody>

                <CardFooter justifyContent='end' gap={2} p={{ base: 1, md: 2, lg: 6 }}>
                    {isMobile ? (
                        <IconButton
                            aria-label='save'
                            borderColor='blackAlpha.600'
                            icon={<CustomIcon icon={heartIcon} />}
                            variant='outline'
                            size='xs'
                        />
                    ) : (
                        <Button
                            borderColor='blackAlpha.600'
                            leftIcon={<CustomIcon icon={heartIcon} />}
                            variant='outline'
                            size='sm'
                        >
                            Сохранить
                        </Button>
                    )}
                    <Button
                        variant='solid'
                        bg='blackAlpha.900'
                        color='white'
                        size={isMobile ? 'xs' : 'sm'}
                        onClick={handleRecipeClick}
                        data-test-id={`card-link-${dataTestId}`}
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
