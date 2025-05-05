import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    Image,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';

import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';
import { TRUNCATE_STYLES } from '~/constants/menu.constants';
import { CustomTag } from '~/shared/components/custom-tag/custom-tag';
import { StatBadge } from '~/shared/components/stat-bage/stat-bage';
import useDishNavigation from '~/shared/hooks/category.hook';
import { Recipe } from '~/shared/types/recipe.types';

export const SliderCard: FC<Recipe> = ({
    _id,
    title,
    description,
    categoriesIds,
    image,
    bookmarks,
    likes,
}) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const sliderWidth = useBreakpointValue({ base: '158px', xl: '277px', '2xl': '322px' });
    const imageHeight = useBreakpointValue({ base: '128px', lg: '230px' });
    const truncateStyles = useBreakpointValue({
        base: {},
        lg: TRUNCATE_STYLES,
    });

    const { currentCategories, handleRecipeClick } = useDishNavigation(categoriesIds, _id);

    return (
        <Card
            w={sliderWidth}
            borderRadius='lg'
            overflow='hidden'
            variant='outline'
            h='full'
            onClick={handleRecipeClick}
            data-test-id={`carousel-card-${_id}`}
        >
            <Image objectFit='cover' src={image} height={imageHeight} alt='recipe' />
            <CardBody px={{ base: 2, md: 2, lg: 3, '2xl': 6 }} py={{ base: 2, lg: 4 }}>
                <Heading
                    as='h4'
                    size={{ base: 'md', md: 'sm', lg: 'md' }}
                    fontWeight={500}
                    noOfLines={isMobile ? 2 : 1}
                    sx={truncateStyles}
                >
                    {title}
                </Heading>
                {!isMobile && (
                    <Text fontSize='sm' noOfLines={3} letterSpacing={0.6} pt={3}>
                        {description}
                    </Text>
                )}
            </CardBody>

            <CardFooter
                justify='space-between'
                px={{ base: 3, md: 2, lg: 4, '2xl': 6 }}
                py={{ base: 3, md: 2, lg: 2, '2xl': 4 }}
            >
                <VStack alignItems='start'>
                    {currentCategories.map((category, index) => (
                        <CustomTag
                            key={index}
                            category={category}
                            color='lime.150'
                            position={isMobile ? 'absolute' : 'static'}
                        />
                    ))}
                </VStack>
                <HStack spacing={5} align='end'>
                    {bookmarks && <StatBadge fontSize='sm' icon={heartIcon} count={bookmarks} />}
                    {likes && <StatBadge fontSize='sm' icon={peopleIcon} count={likes} />}
                </HStack>
            </CardFooter>
        </Card>
    );
};
