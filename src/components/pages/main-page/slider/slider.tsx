import 'swiper/css';
import 'swiper/css/navigation';

import { Heading, HStack, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SliderType } from '~/shared/types/page-config.types';

import { recipes } from './helpers';
import { NavigationButton } from './navigation-button';
import { SliderCard } from './slider-card';

type SliderProps = {
    sliders: Array<SliderType>;
};

const BREAKPOINT_CONFIG = {
    top: { base: '90%', md: '50%' },
    side: { base: '30%', md: '-8px' },
    isMobile: { base: true, lg: false },
    titleSize: { base: 'lg', md: 'md', lg: 'xl', '2xl': '2xl' },
    sliderWidth: { base: 344, sm: 344, md: '100%' },
};

const SWIPER_BREAKPOINTS = {
    320: {
        slidesPerView: 2.1,
        spaceBetween: 12,
    },
    768: {
        slidesPerView: 4.3,
        spaceBetween: 12,
    },
    1440: {
        slidesPerView: 3.1,
        spaceBetween: 12,
    },
    1920: {
        slidesPerView: 4,
        spaceBetween: 24,
    },
};

export const Slider: FC<SliderProps> = () => {
    const top = useBreakpointValue(BREAKPOINT_CONFIG.top);
    const side = useBreakpointValue(BREAKPOINT_CONFIG.side);
    const isMobile = useBreakpointValue(BREAKPOINT_CONFIG.isMobile);
    const titleSize = useBreakpointValue(BREAKPOINT_CONFIG.titleSize);
    const sliderWidth = useBreakpointValue(BREAKPOINT_CONFIG.sliderWidth);

    return (
        <>
            <Heading as='h2' size={titleSize} pb={{ base: 2, lg: 6 }}>
                Новые рецепты
            </Heading>
            <HStack position='relative' w={sliderWidth}>
                {!isMobile && (
                    <>
                        <NavigationButton
                            aria-label='left-arrow'
                            direction='prev'
                            left={side}
                            top={top}
                            transform='translateY(-50%)'
                        />
                        <NavigationButton
                            aria-label='right-arrow'
                            direction='next'
                            right={side}
                            top={top}
                            transform='translateY(-50%)'
                        />
                    </>
                )}
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
                >
                    {recipes.map((recipe) => (
                        <SwiperSlide key={recipe.id} style={{ height: 'auto' }}>
                            <SliderCard {...recipe} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </HStack>
        </>
    );
};
