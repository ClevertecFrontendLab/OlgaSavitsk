import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';

import { SliderType } from '../helpers';
import { SliderCard } from './slider-card';

type SliderProps = {
    sliders: Array<SliderType>;
};

export const Slider: FC<SliderProps> = ({ sliders }) => {
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '-8px' });
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const titleSize = useBreakpointValue({ base: 'lg', md: 'md', lg: 'xl', '2xl': '2xl' });

    return (
        <Box position='relative'>
            <Heading
                as='h2'
                size={titleSize}
                pb={{ base: 2, lg: 6 }}
                letterSpacing={{ base: 0, md: 1.2 }}
            >
                Новые рецепты
            </Heading>
            {!isMobile && (
                <>
                    <IconButton
                        aria-label='left-arrow'
                        position='absolute'
                        left={side}
                        top={top}
                        transform='translateY(-50%)'
                        zIndex={1}
                        bg='black'
                        size={isMobile ? 'md' : 'lg'}
                        icon={<ArrowBackIcon color='lime.50' />}
                    />
                    <IconButton
                        aria-label='right-arrow'
                        position='absolute'
                        right={side}
                        top={top}
                        transform='translateY(-50%)'
                        zIndex={1}
                        bg='black'
                        size={isMobile ? 'md' : 'lg'}
                        icon={<ArrowForwardIcon color='lime.50' />}
                    />
                </>
            )}
            <HStack overflow='hidden' align='stretch'>
                <HStack spacing={{ base: 3, lg: 3, '2xl': 6 }}>
                    {sliders.map((slide, index) => (
                        <SliderCard key={index} {...slide} />
                    ))}
                </HStack>
            </HStack>
        </Box>
    );
};
