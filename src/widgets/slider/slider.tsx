import 'swiper/css';
import 'swiper/css/navigation';

import { Box, Heading, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { SLIDES_PER_PAGE } from '~/constants/recipes.constants';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { Recipe } from '~/shared/types/recipe.types';
import { isArrayWithItems } from '~/shared/utils/common';

import { useBreakpointConfig } from './config/breakpoints';
import { SWIPER_BREAKPOINTS } from './config/swiper-config';
import { NavigationButton } from './ui/navigation-button';
import { SliderCard } from './ui/slider-card';

export const Slider = () => {
    const { titleSize, sliderWidth, sliderTop, sliderSide, isMobile } = useBreakpointConfig();
    const { data: sliderRecipes } = useGetRecipesQuery({
        limit: SLIDES_PER_PAGE,
        sortBy: 'createdAt',
    });

    const sortedRecipes = useMemo(
        () =>
            sliderRecipes?.data
                ?.slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [sliderRecipes?.data],
    );

    return (
        <>
            <Heading as='h2' size={titleSize} pb={{ base: 2, lg: 6 }}>
                Новые рецепты
            </Heading>
            <HStack position='relative' maxW={sliderWidth}>
                <Box display={isMobile ? 'none' : 'block'}>
                    <NavigationButton
                        aria-label='left-arrow'
                        direction='prev'
                        left={sliderSide}
                        top={sliderTop}
                        data-test-id='carousel-back'
                    />
                    <NavigationButton
                        aria-label='right-arrow'
                        direction='next'
                        right={sliderSide}
                        top={sliderTop}
                        data-test-id='carousel-forward'
                    />
                </Box>
                <Swiper
                    modules={[Navigation]}
                    navigation={
                        !isMobile
                            ? {
                                  prevEl: '.custom-swiper-button-prev',
                                  nextEl: '.custom-swiper-button-next',
                              }
                            : false
                    }
                    loop={true}
                    breakpoints={SWIPER_BREAKPOINTS}
                    data-test-id={DATA_TEST_ID.CAROUSEL}
                >
                    {isArrayWithItems(sortedRecipes) &&
                        sortedRecipes.map((recipe: Recipe, index: number) => (
                            <SwiperSlide key={recipe._id} style={{ height: 'auto' }}>
                                <SliderCard {...recipe} index={index} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </HStack>
        </>
    );
};
